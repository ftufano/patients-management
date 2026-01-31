<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureTokenIsActive
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $timeout = config('sanctum.inactivity_timeout');

        if (!$timeout) {
            return $next($request);
        }

        $user = $request->user();
        $token = $user?->currentAccessToken();

        if (!$token) {
            return response()->json(['message' => 'Unauthorized.'], Response::HTTP_UNAUTHORIZED);
        }

        $now = Carbon::now();

        if ($token->last_used_at === null) {
            $token->forceFill(['last_used_at' => $now])->save();
            return $next($request);
        }

        $lastUsedAt = Carbon::parse($token->last_used_at);
        $inactiveMinutes = $lastUsedAt->diffInMinutes($now);

        if ($inactiveMinutes >= $timeout) {
            $token->delete();

            return response()->json([
                'message' => 'Session expired due to inactivity.',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $token->forceFill(['last_used_at' => $now])->save();

        return $next($request);
    }
}
