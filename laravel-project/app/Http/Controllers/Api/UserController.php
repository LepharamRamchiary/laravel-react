<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return UserResource::collection(User::query()->orderBy('id', 'desc')->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        try {
            Log::info('Store User Request Data:', $request->all());
            
            $data = $request->validated();
            $data['password'] = bcrypt($data['password']);
            $user = User::create($data);
            
            Log::info('User created successfully:', ['user_id' => $user->id]);
            
            return response(new UserResource($user), 201);
        } catch (\Exception $e) {
            Log::error('Error creating user:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response(['error' => 'Failed to create user'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        try {
            Log::info('Update User Request Data:', $request->all());
            Log::info('User being updated:', ['user_id' => $user->id]);
            
            $data = $request->validated();
            
            Log::info('Validated data:', $data);
            
            if(isset($data['password']) && !empty($data['password'])) {
                $data['password'] = bcrypt($data['password']);
            } else {
                // Remove password from data if it's empty or null
                unset($data['password']);
            }
            
            // Remove password_confirmation as it's not needed for update
            unset($data['password_confirmation']);
            
            Log::info('Final data for update:', $data);
            
            $user->update($data);
            
            Log::info('User updated successfully:', ['user_id' => $user->id]);

            return response(new UserResource($user), 200);
        } catch (\Exception $e) {
            Log::error('Error updating user:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'user_id' => $user->id ?? 'unknown'
            ]);
            return response(['error' => 'Failed to update user'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response("", 204);
    }
}