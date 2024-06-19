<?php

namespace App\Utils;

use Exception;
use Illuminate\Support\Facades\File;

class JsonReader
{
    public static function readJsonFile($filePath)
    {
        if (!File::exists($filePath)) {
            throw new Exception("File not found.");
        }

        $jsonContent = File::get($filePath);
        $data = json_decode($jsonContent, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception("Error decoding JSON: " . json_last_error_msg());
        }

        return $data;
    }
}
