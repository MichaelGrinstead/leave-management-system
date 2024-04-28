<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class DeleteLeaveRequests extends Command
{
    protected $signature = 'delete:leave-requests {from} {to}';
    protected $description = 'Send leave request payloads with non-overlapping dates';

    public function handle()
    {
        $baseUrl = 'http://127.0.0.1:8000/api/leave-requests/'; 
        $from = $this->argument('from');
        $to = $this->argument('to');
        $token = '19|4Vpw8SKz2ZfIoDhTGqMRhb7Vf8cGCHi23NwMabCQc65a13c7'; 
        $delayInSeconds = 1;

        log::info($from);
        log::info($to);

        for ($i = $from; $i < $to; $i++) {
            $url = $baseUrl . ($i);
            log::info($url);
            log::info($i);
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $token
            ])->delete($url);

        ;
            if ($response->successful()) {
                $this->info("Request {$i}: Success - " . $response->body());
            } else {
                $this->error("Request {$i}: Failed - " . $response->body());
            }
            sleep($delayInSeconds);
        }
    }
}
   
