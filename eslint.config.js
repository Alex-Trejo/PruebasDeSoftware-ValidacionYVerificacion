const js = require('@eslint/js');
module.exports = [
    {
        files: ['src/**/*.js'],
        ignores: ['coverage/**'],

        //declaramos que se esta usando node como entorno de ejecución
    

        //se usa el parser de eslint para js

        languageOptions: {
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'commonjs',
            },
            globals: {
            require: 'readonly',
            module: 'readonly',
            __dirname: 'readonly',
      },
        },
        rules: {
        ...js.configs.recommended.rules,
                // Evita variables declaradas pero no usadas, mostrando una advertencia
            'no-unused-vars': 'warn',
            // Permite el uso de console.log para depuración
            'no-console': 'off',
            // Exige el uso de === y !== en lugar de == y != para comparaciones
            'eqeqeq': ['error', 'always'],
            // Obliga a usar llaves en bloques de control (if, for, etc.)
            'curly': 'error',
            // Exige punto y coma al final de cada declaración
            'semi': ['error', 'always'],
            // Obliga a usar comillas simples para cadenas de texto
            'quotes': ['error', 'single'],
            // Exige nombres en camelCase para variables, funciones y propiedades
            'camelcase': ['error', { properties: 'always' }],
            // Asegura indentación consistente de 2 espacios
            'indent': ['error', 2],
            // Prohíbe espacios en blanco al final de las líneas
            'no-trailing-spaces': 'error',
            // Limita a una sola línea vacía consecutiva
            'no-multiple-empty-lines': ['error', { max: 1 }]

        }
        
    }
]