<?php

use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

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
    //Validated
    $validateUser = Validator::make($request->all(), 
    [
        'name' => 'required',
        'email' => 'required|email|unique:users,email',
        'password' => 'required'
    ]);

    if($validateUser->fails()){
        return response()->json([
            'success' => false,
            'message' => 'validation error',
            'errors' => $validateUser->errors()
        ], 401);
    }

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password)
    ]);

    return response()->json([
        'success' => true,
        'message' => 'User Created Successfully',
        'data' => [
            'token' => $user->createToken("API_TOKEN")->plainTextToken,
            'user' => $user,
        ]
    ], 200);
});

Route::post('auth/login', function(Request $request){

    $validateUser = Validator::make($request->all(), 
    [
        'email' => 'required|email',
        'password' => 'required'
    ]);

    if($validateUser->fails()){
        return response()->json([
            'success' => false,
            'message' => 'validation error',
            'errors' => $validateUser->errors()
        ], 401);
    }

    if(!Auth::attempt($request->only(['email', 'password']))){
        return response()->json([
            'success' => false,
            'message' => 'Email & Password does not match with our record.',
        ], 401);
    }

    $user = User::where('email', $request->email)->first();

    return response()->json([
        'success' => true,
        'message' => 'Utilisateur connecté avec succès',
        'data' => [
            'token' => $user->createToken("API_TOKEN")->plainTextToken,
            'user' => $user,
        ]
    ], 200);
});

Route::post('auth/logout', function (Request $request){
    $request->user()->currentAccessToken()->delete();
    return response()->json(['message' => 'Successfully logged out']);
});

Route::get('auth/me', function (Request $request){
    return response()->json($request->user());
});


Route::get('/categories/all', function () {
    return Category::all();
});
Route::get('/categories/one/{id}', function (int $id) {
    return Category::find($id);
});
Route::get('/categories/pagiante', function (Request $request) {
    
    $offset = ($request->pageIndex - 1) * $request->pageSize;

    $categories = Category::skip($offset)->take($request->pageSize)->get();
    
    return response()->json([
        'items' => $categories,
        'pageIndex' => $request->pageIndex,
        'pageSize' => $request->pageSize,
        'totalCount' => Category::count(),
    ]);
});
Route::post('/categories/create', function (Request $request) {
    
    // Define validation rules
    $rules = [
        'name' => 'required|max:255',
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
    // Define validation rules
    $rules = [
        'name' => 'required|max:255',
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

    $category = Category::find($id);
    $category->name = $request->name;
    $category->save();
    $item = Category::find($id);

    return response()->json([
        'message' => 'Modification réussie!', 
        'item' => $item, 
        'success' => true
    ], 201);
});
Route::delete('/categories/delete/{id}', function (int $id) {
    $category = Category::find($id);
    $category->delete();
});

