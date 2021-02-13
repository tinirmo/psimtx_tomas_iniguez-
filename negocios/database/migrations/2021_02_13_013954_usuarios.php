<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Usuarios extends Migration
{
		/**
		 * Run the migrations.
		 *
		 * @return void
		 */
		public function up(){
			Schema::create('usuarios', function (Blueprint $table) {
				 $table->id();
				 $table->foreignId('id_perfil')->constrained('perfiles')->references('id')->on('perfiles');
				 $table->foreignId('id_estado')->constrained('estados')->references('id')->on('estados');
				 $table->string('nombre');
				 $table->string('email')->unique();
				 $table->string('password');
				 $table->timestamps();
			});
		}

		/**
		 * Reverse the migrations.
		 *
		 * @return void
		 */
		public function down(){
			Schema::drop('usuarios');
		}
}
