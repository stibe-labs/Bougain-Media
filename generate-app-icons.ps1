Add-Type -AssemblyName System.Drawing
$srcPath = "c:\Users\abhis\OneDrive\Desktop\Bougain Media\public\logos\BM LOGO icon G-01.png"
$destPathIcon = "c:\Users\abhis\OneDrive\Desktop\Bougain Media\src\app\icon.png"
$destPathApple = "c:\Users\abhis\OneDrive\Desktop\Bougain Media\src\app\apple-icon.png"

$img = [System.Drawing.Image]::FromFile($srcPath)
$size = [math]::Max($img.Width, $img.Height)

# Create a square bitmap
$bmp = New-Object System.Drawing.Bitmap($size, $size)
$graphics = [System.Drawing.Graphics]::FromImage($bmp)
$graphics.Clear([System.Drawing.Color]::Transparent)

# Center the image
$x = [math]::Round(($size - $img.Width) / 2)
$y = [math]::Round(($size - $img.Height) / 2)

$graphics.DrawImage($img, $x, $y, $img.Width, $img.Height)

# Save as icon.png and apple-icon.png in src/app
$bmp.Save($destPathIcon, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Save($destPathApple, [System.Drawing.Imaging.ImageFormat]::Png)

$graphics.Dispose()
$bmp.Dispose()
$img.Dispose()
Write-Host "Icons generated in src/app/"
