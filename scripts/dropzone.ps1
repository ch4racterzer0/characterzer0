param(
  [string]$Target = "D:\vercel\characterzer0\public\Chracterzer零号",
  [int]$Size = 220,
  [string]$Mode = "copy"
)

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

if (-not (Test-Path -LiteralPath $Target)) {
  New-Item -ItemType Directory -Path $Target -Force | Out-Null
}

Add-Type -AssemblyName PresentationFramework, PresentationCore, WindowsBase, System.Windows.Forms, System.Drawing

$leftScreen = [System.Windows.Forms.Screen]::AllScreens |
  Sort-Object { $_.Bounds.Left } |
  Select-Object -First 1
$screenL = $leftScreen.WorkingArea.Left
$screenT = $leftScreen.WorkingArea.Top
$screenW = $leftScreen.WorkingArea.Width
$screenH = $leftScreen.WorkingArea.Height

$xaml = @"
<Window xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="Chracterzer零号 hole"
        WindowStyle="None" AllowsTransparency="True" Background="Transparent"
        Topmost="True" ShowInTaskbar="False" SizeToContent="WidthAndHeight"
        AllowDrop="True">
  <Grid Width="$Size" Height="$Size" Background="Transparent" AllowDrop="True" x:Name="Root">
    <Ellipse x:Name="Halo" Width="$Size" Height="$Size" Fill="Black" Opacity="0.55"/>
    <Ellipse x:Name="Ring" Width="$($Size-12)" Height="$($Size-12)" Stroke="#60aaffff" StrokeThickness="1.5"/>
    <Ellipse x:Name="Inner" Width="$($Size-40)" Height="$($Size-40)" Stroke="#2266ccff" StrokeThickness="1"/>
    <TextBlock x:Name="Label"
               HorizontalAlignment="Center" VerticalAlignment="Center"
               Foreground="#ccaaeeff" FontFamily="Consolas" FontSize="11"
               TextAlignment="Center"
               Text="Chracterzer零号&#10;drop here"/>
  </Grid>
</Window>
"@

[xml]$x = $xaml
$reader = New-Object System.Xml.XmlNodeReader $x
$win    = [Windows.Markup.XamlReader]::Load($reader)
$root   = $win.FindName("Root")
$halo   = $win.FindName("Halo")
$label  = $win.FindName("Label")

$win.Left = $screenL + 40
$win.Top  = $screenT + $screenH - $Size - 80

$win.Add_MouseLeftButtonDown({ $win.DragMove() })

$root.Add_DragEnter({
  param($s,$e)
  if ($e.Data.GetDataPresent([Windows.DataFormats]::FileDrop)) {
    $e.Effects = if ($Mode -eq 'move') { [Windows.DragDropEffects]::Move } else { [Windows.DragDropEffects]::Copy }
    $halo.Fill = [Windows.Media.Brushes]::DodgerBlue
    $halo.Opacity = 0.45
    $label.Text = "release to drop"
  } else {
    $e.Effects = [Windows.DragDropEffects]::None
  }
  $e.Handled = $true
})

$root.Add_DragLeave({
  $halo.Fill = [Windows.Media.Brushes]::Black
  $halo.Opacity = 0.55
  $label.Text = "Chracterzer零号`ndrop here"
})

$root.Add_DragOver({
  param($s,$e)
  if ($e.Data.GetDataPresent([Windows.DataFormats]::FileDrop)) {
    $e.Effects = if ($Mode -eq 'move') { [Windows.DragDropEffects]::Move } else { [Windows.DragDropEffects]::Copy }
  } else {
    $e.Effects = [Windows.DragDropEffects]::None
  }
  $e.Handled = $true
})

$root.Add_Drop({
  param($s,$e)
  $files = $e.Data.GetData([Windows.DataFormats]::FileDrop)
  if (-not $files) { return }
  $ok = 0; $fail = 0
  foreach ($f in $files) {
    try {
      $name = Split-Path -Path $f -Leaf
      $dest = Join-Path $Target $name
      if (Test-Path -LiteralPath $dest) {
        $base = [IO.Path]::GetFileNameWithoutExtension($name)
        $ext  = [IO.Path]::GetExtension($name)
        $i = 1
        do {
          $dest = Join-Path $Target ("{0} ({1}){2}" -f $base, $i, $ext)
          $i++
        } while (Test-Path -LiteralPath $dest)
      }
      if ($Mode -eq 'move') {
        Move-Item -LiteralPath $f -Destination $dest -Force
      } else {
        Copy-Item -LiteralPath $f -Destination $dest -Recurse -Force
      }
      $ok++
    } catch {
      $fail++
    }
  }
  $label.Text = "+$ok dropped"
  if ($fail -gt 0) { $label.Text += "`n$fail failed" }
  Start-Sleep -Milliseconds 1200
  $label.Text = "Chracterzer零号`ndrop here"
  $halo.Fill = [Windows.Media.Brushes]::Black
  $halo.Opacity = 0.55
})

$win.Add_KeyDown({
  param($s,$e)
  if ($e.Key -eq 'Escape') { $win.Close() }
})

$null = $win.ShowDialog()
