<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Laravel\Sanctum\Sanctum;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Sanctum::authenticateAccessTokensUsing(function ($accessToken, $isValid) {
            if (! $isValid) {
                return false;
            }

            $timeout = (int) config('sanctum.inactivity_timeout');

            if ($timeout <= 0) {
                return true;
            }

            $lastUsedAt = $accessToken->last_used_at;

            if ($lastUsedAt === null) {
                return true;
            }

            return $lastUsedAt->gt(now()->subMinutes($timeout));
        });
    }
}
