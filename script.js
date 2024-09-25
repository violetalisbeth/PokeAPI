function buscarPokemon() {
    const idNombre = document.getElementById('pokemonId').value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${idNombre}`; // Usa comillas invertidas

    fetch(url)
        .then(response => {
            if (!response.ok) {
                alert('Pokémon no encontrado');
                throw new Error('Pokémon no encontrado');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('nombre').textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            document.getElementById('imagen').src = data.sprites.front_default;
            document.getElementById('id').textContent = data.id;
            document.getElementById('altura').textContent = data.height / 10; // Convertir a metros
            document.getElementById('peso').textContent = data.weight / 10; // Convertir a kilogramos

            document.querySelector('.pokemon-info').style.display = 'block';
        })
        .catch(error => console.log(error));
}
