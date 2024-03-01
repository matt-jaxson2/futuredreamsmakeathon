<?php
namespace futureDreams\functions;

use Exception;
use RuntimeException;

/**
 * [Description Entries]
 */
class Entries {
    public $count;
    public $entries;
    public $space;
}

/**
 * [Description admin]
 */
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
    public function entries(): object
    {
        $existingData = $this->loadDataFromJson();
        $entries = new entries();

        $spaceFree = disk_free_space('./');
        $totalSpace = disk_total_space('./');
        $entries->space = (100 - round((($totalSpace - $spaceFree)/$totalSpace) * 100)) . "%";

        if ($existingData) {

            $formatter = new \NumberFormatter("en", \NumberFormatter::SPELLOUT);

            $entries->count = $formatter->format(count($existingData));
            $entries->entries = $existingData;
        } else {
            $entries->count = "Zero";
            $entries->entries = [];

        }
        return $entries;
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
     * @param mixed $delimiter
     * 
     * @return mixed
     */
    private function parseCsvData($fileName, $delimiter=',')
    {
        if(!file_exists('./uploads/' . $fileName) || !is_readable('./uploads/' . $fileName))
            return FALSE;

        $header = NULL;
        $data = array();
        if (($handle = fopen('./uploads/' . $fileName, 'r')) !== FALSE)
        {
            while (($row = fgetcsv($handle, 1000, $delimiter)) !== FALSE)
            {
                if(!$header)
                    $header = $row;
                else
                    $data[] = array_combine($header, $row);
            }
            fclose($handle);
        }
        return $data;
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
                if (!empty($row['File']) && !empty($row['Entry ID'])) {
                    foreach (['small', 'medium'] as $size) {
                        $this->resizeImage($row['File'], $row['Entry ID'], $size);
                    }
                } else {
                    continue;
                }                    

                $newRow['name'] = strip_tags($row['Name (First)'] . " " . $row['Name (Last)']);
                $newRow['imageSmall'] = "./entries/images/".$row['Entry ID']."-small.jpg";
                $newRow['imageMedium'] = "./entries/images/".$row['Entry ID']."-medium.jpg";
                $newRow['message'] = strip_tags($row['Please write your message in the space below.']);
                $newRow['highlight'] = false;
                $newRow['id'] = $row['Entry ID'];
        
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
        if (!$imageUrl || !@getimagesize($imageUrl)) return;
        $im = $this->imageFixOrientation($imageUrl, $entryId);

        $newWidth = match ($size) {
            'small' => self::SMALL_WIDTH,
            'medium' => self::MEDIUM_WIDTH,
            default => throw new Exception("Invalid image size specified."),
        };

        $targetFile = "../entries/images/$entryId-$size.jpg";
        if (!file_exists($targetFile)) {
            try {
                try {
                    $width = imagesx($im);
                    $height = imagesy($im);
    
                    // Preserve aspect ratio
                    $aspect = ($height / $width);

                    $newHeight = floor($newWidth * $aspect);

                    $newImage = null;

                    if ($size === "small") {

                        $sq = self::SMALL_WIDTH;

                        if ($width > $height) {
                            $aspect = ($width / $height);
                            $newHeight = $newWidth;
                            $newWidth = floor($newHeight * $aspect);
                        }

                        $offsetX = floor(($sq - $newWidth)/2);
                        $offsetY = floor(($sq - $newHeight)/2);

                        $newImage = imagecreatetruecolor($sq, $sq);
                        imagecopyresampled($newImage, $im, $offsetX, $offsetY, 0, 0, $newWidth, $newHeight, $width, $height);

                    } else {
                        $newImage = imagecreatetruecolor($newWidth, $newHeight);
                        imagecopyresampled($newImage, $im, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
                    }

                    if ($newImage) {
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

    /**
     * @param mixed $filename
     * 
     * @return [type]
     */
    private function imageFixOrientation($filename, $id) {
        $exif = exif_read_data($filename);
        if (!empty($exif['Orientation'])) {
            $image = imagecreatefromjpeg($filename);
                switch ($exif['Orientation']) {
                case 1:
                    break;
                case 3:
                    $image = imagerotate($image, 180, 0);
                    break;
                case 6:
                    $image = imagerotate($image, -90, 0);
                    break;
                case 8:
                    $image = imagerotate($image, 90, 0);
                    break;
            }
            return $image;
        }
    }

}
