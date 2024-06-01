<?php

use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/users/all', function () {
    return User::all();
});


Route::post('/users/create', function (Request $request) {
    $user = User::create([
        "name" => $request->name,
        "email" => $request->email,
        "password" => $request->password
    ]);
});


Route::get('/categories/all', function () {
    return Category::all();
});
Route::get('/categories/pagiante', function (Request $request) {
    
    $offset = ($request->pageIndex - 1) * $request->pageSize;

    $categories = Category::skip($offset)->take($request->pageSize)->get();
    
    return response()->json([
        'data' => $categories,
        'pageIndex' => $request->pageIndex,
        'pageSize' => $request->pageSize,
        'totalCount' => Category::count(),
    ]);
});
Route::post('/categories/create', function (Request $request) {
    
    // Define validation rules
    $rules = [
        'name' => 'required|max:5',
    ];

    $messages = [
        'required' => 'Le champ :attribute est obligatoire.',
        'max' => 'Le champ :attribute ne doit pas dépasser :max caractères.',
    ];

    // Perform validation with custom messages
    $validator = Validator::make($request->all(), $rules, $messages);

    // Check if validation fails
    if ($validator->fails()) {
        // Return validation errors
        return response()->json(['errors' => $validator->errors()], 422);
    }

    $item = Category::create([
        "name" => $request->name
    ]);

    return response()->json([
            'message' => 'Création réussie!', 
            'item' => $item, 
            'success' => true
        ], 201);
});
Route::put('/categories/update/{id}', function (Request $request, int $id) {
    $category = Category::find($id);
    $category->name = $request->name;
    $category->save();
});
Route::delete('/categories/delete/{id}', function (int $id) {
    $category = Category::find($id);
    $category->delete();
});

