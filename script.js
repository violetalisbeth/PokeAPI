let pokemonsBuscados = []; // Array para almacenar los Pokémon buscados

function buscarPokemon() {
    const idNombre = document.getElementById('pokemonId').value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${idNombre}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                alert('Pokémon no encontrado');
                throw new Error('Pokémon no encontrado');
            }
            return response.json();
        })
        .then(data => {
            // Mostrar información del Pokémon
            document.getElementById('nombre').textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            document.getElementById('imagen').src = data.sprites.front_default;
            document.getElementById('id').textContent = data.id;
            document.getElementById('altura').textContent = (data.height / 10).toFixed(2); // Convertir a metros
            document.getElementById('peso').textContent = (data.weight / 10).toFixed(2); // Convertir a kilogramos

            // Agregar Pokémon a la lista de buscados
            agregarAPokemonsBuscados(data.name);

            document.querySelector('.pokemon-info').style.display = 'block';
        })
        .catch(error => console.log(error));
}

function agregarAPokemonsBuscados(nombre) {
    // Agregar el nombre a la lista de Pokémon buscados
    pokemonsBuscados.push(nombre);

    // Limitar el número de Pokémon mostrados (por ejemplo, 10)
    if (pokemonsBuscados.length > 10) {
        pokemonsBuscados.shift(); // Eliminar el más antiguo si hay más de 10
    }

    // Actualizar la lista en el HTML
    mostrarListaBuscados();
}

function mostrarListaBuscados() {
    const lista = document.getElementById('listaBuscados');
    lista.innerHTML = ''; // Limpiar la lista antes de actualizar

    pokemonsBuscados.forEach(nombre => {
        const li = document.createElement('li');
        li.textContent = nombre.charAt(0).toUpperCase() + nombre.slice(1);
        lista.appendChild(li);
    });
}
