<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RelUsuariosIntereses extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up(){
		Schema::create('rel_usuarios_intereses', function (Blueprint $table) {
			 $table->id();
			 $table->foreignId('id_usuario')->constrained('usuarios')->references('id')->on('usuarios');
			 $table->foreignId('id_interes')->constrained('intereses')->references('id')->on('intereses');
			 $table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down(){
		Schema::drop('rel_usuarios_intereses');
	}
}
