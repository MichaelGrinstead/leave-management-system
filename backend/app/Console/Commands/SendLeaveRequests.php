<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class SendLeaveRequests extends Command
{
    protected $signature = 'send:leave-requests {count}';
    protected $description = 'Send leave request payloads with non-overlapping dates';

    public function handle()
    {
        $url = 'http://127.0.0.1:8000/api/leave-requests'; 
        $count = $this->argument('count');
        $token = '19|4Vpw8SKz2ZfIoDhTGqMRhb7Vf8cGCHi23NwMabCQc65a13c7'; 
        $delayInSeconds = 1;


        for ($i = 0; $i < $count; $i++) {
            $payload = $this->generateLeaveRequestPayload($i);
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $token
            ])->post($url, [
                'user_id'    => $payload[0],
                'type'      => $payload[1],
                'start_date' => $payload[2],
                'end_date'   => $payload[3],
                'reason'    => $payload[4]
            ]);

            $indexPlusOne = $i + 1;
            if ($response->successful()) {
                $this->info("Request {$indexPlusOne}: Success - " . $response->body());
            } else {
                $this->error("Request {$indexPlusOne}: Failed - " . $response->body());
            }
            sleep($delayInSeconds);
        }
    }

    private function generateLeaveRequestPayload($index)
    {
        $startDate = now()->addDays($index * 2);
        $endDate = (clone $startDate)->addDay();

        return [
            '1', 
            'Vacation', 
            $startDate->toIso8601String(), 
            $endDate->toIso8601String(), 
            'Annual leave' 
        ];
    }
}
