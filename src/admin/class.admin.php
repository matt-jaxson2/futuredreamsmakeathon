<?php
namespace futureDreams\functions;

use Exception;
use RuntimeException;

class admin
{

    private const SMALL_WIDTH = 200;
    private const MEDIUM_WIDTH = 320;

    /**
     * @param mixed $file
     * 
     * @return [string]
     */
    public function processData($file): string
    {
        $this->moveFile($file);
        $data = $this->parseCsvData($file['name']);
        $processedData = $this->processRows($data);
        $this->saveDataToJson($processedData);

        $formatter = new \NumberFormatter("en", \NumberFormatter::SPELLOUT);
        return $formatter->format(count($processedData));
    }

    /**
     * @return [type]
     */
    public function entries(): string
    {
        $existingData = $this->loadDataFromJson();
        if ($existingData) {
            $formatter = new \NumberFormatter("en", \NumberFormatter::SPELLOUT);
            return $formatter->format(count($existingData));
        }

        return "zero";
    }

    /**
     * @return array|null
     */
    private function loadDataFromJson(): ?array
    {
        if (file_exists('../entries/data.json')) {
            try {
                $jsonData = file_get_contents('../entries/data.json');
                $data = json_decode($jsonData, true);
                if (is_array($data)) {
                    return $data;
                } else {
                    throw new Exception("Invalid JSON data format.");
                }
            } catch (Exception $e) {
                return null;
            }
        }
    
        return null;
    }

    /**
     * @param mixed $file
     * 
     * @return void
     */
    private function moveFile($file): void
    {
        try {
            // Validate file type and size
            if (
                $file['type'] !== 'text/csv' ||
                $file['size'] > 2097152 // 2MB limit
            ) {
                throw new Exception("Invalid file type or size.");
            }
    
            // Ensure target directory exists
            $uploadsDir = 'uploads';
            if (!is_dir($uploadsDir) && !mkdir($uploadsDir, 0755, true)) {
                throw new Exception("Failed to create uploads directory.");
            }
    
            // Move the file
            if (!move_uploaded_file($file['tmp_name'], "{$uploadsDir}/{$file['name']}")) {
                throw new Exception("Failed to move uploaded file.");
            }
        } catch (Exception $e) {
            throw new RuntimeException("File handling error: " . $e->getMessage());
        }
    }

    /**
     * @param string $fileName
     * 
     * @return array
     */
    private function parseCsvData(string $fileName): array
    {
        try {
            $data = array_map('str_getcsv', file('./uploads/' . $fileName));
            array_shift($data);
            return $data;
        } catch (Exception $e) {
            return [];
        }
    }

    /**
     * @param array $data
     * 
     * @return array
     */
    private function processRows(array $data): array
    {
        $newData = [];
        foreach ($data as $row) {
            try {
                $newRow = [];
                if (!empty($row[6]) && !empty($row[15])) {
                    foreach (['small', 'medium'] as $size) {
                        $this->resizeImage($row[6], $row[15], $size);    
                    }
                } else {
                    continue;
                }                    

                $newRow['name'] = htmlspecialchars("$row[1] $row[3]");
                $newRow['imageSmall'] = "./entries/images/$row[15]-small.jpg";
                $newRow['imageMedium'] = "./entries/images/$row[15]-medium.jpg";
                $newRow['message'] = htmlspecialchars($row[7]);
                $newRow['highlight'] = false;
                $newRow['id'] = $row[15];
        
                array_push($newData, $newRow);

            } catch (Exception $e) {
                print_r($e);
            }
        }
    
        return $newData;
    }   
    
    /**
     * @param array $data
     * 
     * @return void
     */
    private function saveDataToJson(array $data): void
    {
        try {
            $json = json_encode($data, JSON_THROW_ON_ERROR);
            file_put_contents('../entries/data.json', $json);
        } catch (Exception $e) {
            print_r($e);
        }
    }

    /**
     * @param string $imageUrl
     * @param int $entryId
     * @param string $size
     * 
     * @return void
     */
    private function resizeImage(string $imageUrl, int $entryId, string $size): void
    {
        if (!$imageUrl) return;
        $newWidth = match ($size) {
            'small' => self::SMALL_WIDTH,
            'medium' => self::MEDIUM_WIDTH,
            default => throw new Exception("Invalid image size specified."),
        };

        $exif = exif_read_data($imageUrl);
        $rotation = $exif['Orientation'];

        $targetFile = "../entries/images/$entryId-$size.jpg";
        if (!file_exists($targetFile)) {
            try {
                $img = file_get_contents($imageUrl);
                $im = imagecreatefromstring($img);

                try {
                    $width = imagesx($im);
                    $height = imagesy($im);
    
                    // Preserve aspect ratio
                    $aspect = ($height / $width);

                    $newHeight = floor($newWidth * $aspect);

                    $newImage = null;

                    if ($size === "small") {

                        $sq = max($newWidth, $newHeight);

                        if ($width > $height) {
                            $aspect = ($width / $height);
                            $newHeight = $newWidth;
                            $newWidth = floor($newHeight * $aspect);
                        }

                        $offsetX = floor(($sq - $newWidth)/2);
                        $offsetY = floor(($sq - $newHeight)/2);

                        $newImage = imagecreatetruecolor(self::SMALL_WIDTH, self::SMALL_WIDTH);
                        imagecopyresampled($newImage, $im, $offsetX, $offsetY, 0, 0, $newWidth, $newHeight, $width, $height);

                    } else {
                        $newImage = imagecreatetruecolor($newWidth, $newHeight);
                        imagecopyresampled($newImage, $im, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
                    }

                    if ($newImage) {
                        if ($rotation == 6) {
                            $newImage = imagerotate($newImage, 270, 0);
                        }
                        imagejpeg($newImage, $targetFile);
                    } else {
                        throw new Exception("Failed to create resized image.");
                    }
                } finally {
                    imagedestroy($newImage);
                    imagedestroy($im);
                }
            } catch (Exception $e) {
                print_r($e);
            }
        }
    }            

}
