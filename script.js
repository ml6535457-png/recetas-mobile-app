// ============================================
// DATOS DE RECETAS
// ============================================

const recipes = [
    {
        id: 1,
        title: 'Pasta Carbonara Italiana',
        description: 'Una receta clásica italiana cremosa y deliciosa',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop',
        time: '30 min',
        calories: '450 kcal',
        servings: '4 porciones',
        difficulty: 'Fácil',
        rating: 4.8,
        reviews: 245,
        category: 'Pastas',
        ingredients: [
            '400g de pasta',
            '200g de guanciale',
            '4 huevos',
            '100g de queso Pecorino',
            'Sal y pimienta',
            'Agua'
        ],
        instructions: [
            'Cocina la pasta en agua hirviendo con sal',
            'Corta el guanciale en trozos pequeños y fríelo',
            'Mezcla los huevos con el queso rallado',
            'Escurre la pasta reservando agua de cocción',
            'Mezcla la pasta con guanciale y su grasa',
            'Agrega la mezcla de huevos fuera del fuego',
            'Sirve inmediatamente con pimienta negra'
        ]
    },
    {
        id: 2,
        title: 'Tacos al Pastor',
        description: 'Deliciosos tacos mexicanos con carne marinada',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop',
        time: '25 min',
        calories: '380 kcal',
        servings: '4 porciones',
        difficulty: 'Fácil',
        rating: 4.7,
        reviews: 189,
        category: 'Mexicana'
    },
    {
        id: 3,
        title: 'Ensalada César',
        description: 'Ensalada fresca con aderezo casero',
        image: 'https://images.unsplash.com/photo-1543339494-b2cf2fcf585d?w=400&h=400&fit=crop',
        time: '15 min',
        calories: '280 kcal',
        servings: '2 porciones',
        difficulty: 'Muy Fácil',
        rating: 4.5,
        reviews: 156,
        category: 'Ensaladas'
    },
    {
        id: 4,
        title: 'Paella Valenciana',
        description: 'Arroz español con mariscos y verduras',
        image: 'https://images.unsplash.com/photo-1585238341710-4b4e6ea7ea51?w=400&h=400&fit=crop',
        time: '45 min',
        calories: '520 kcal',
        servings: '6 porciones',
        difficulty: 'Media',
        rating: 4.9,
        reviews: 278,
        category: 'Arroces'
    }
];

// ============================================
// VARIABLES GLOBALES
// ============================================

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let currentScreen = 'home-screen';

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
});

function initializeApp() {
    // Cargar receta del día
    loadRecipeOfDay();
    
    // Actualizar interfaz de favoritos
    updateFavoritesUI();
}

// ============================================
// NAVEGACIÓN
// ============================================

function setupEventListeners() {
    // Botones de navegación inferior
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const screenId = item.dataset.screen;
            switchScreen(screenId);
            updateActiveNavItem(item);
        });
    });

    // Botón ver receta completa
    document.getElementById('view-recipe-btn').addEventListener('click', () => {
        showRecipeDetail(recipes[0]);
    });

    // Botón favorito de la receta del día
    document.getElementById('favorite-btn-home').addEventListener('click', () => {
        toggleFavorite(recipes[0].id, document.getElementById('favorite-btn-home'));
    });

    // Botones favoritos de lista de recetas
    document.querySelectorAll('.recipe-item').forEach((item, index) => {
        const btn = item.querySelector('.favorite-mini-btn');
        btn.addEventListener('click', () => {
            toggleFavorite(recipes[index + 1].id, btn);
        });
    });

    // Categorías rápidas
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            switchScreen('recipes-screen');
            document.querySelector('nav .nav-item:nth-child(2)').click();
        });
    });

    // Categorías completas
    document.querySelectorAll('.category-full-item').forEach(card => {
        card.addEventListener('click', () => {
            alert('Viendo recetas de esta categoría');
        });
    });
}

function switchScreen(screenId) {
    // Ocultar todas las pantallas
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Mostrar pantalla seleccionada
    document.getElementById(screenId).classList.add('active');
    currentScreen = screenId;

    // Scroll arriba
    document.getElementById(screenId).scrollTop = 0;
}

function updateActiveNavItem(activeItem) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    activeItem.classList.add('active');
}

// ============================================
// RECETA DEL DÍA
// ============================================

function loadRecipeOfDay() {
    const recipe = recipes[0];
    
    document.getElementById('recipe-day-image').src = recipe.image;
    document.getElementById('recipe-day-title').textContent = recipe.title;
    document.getElementById('recipe-day-desc').textContent = recipe.description;
    document.getElementById('recipe-day-time').textContent = recipe.time;
    document.getElementById('recipe-day-calories').textContent = recipe.calories;
    document.getElementById('recipe-day-servings').textContent = recipe.servings;

    // Actualizar estado de favorito
    const favBtn = document.getElementById('favorite-btn-home');
    if (favorites.includes(recipe.id)) {
        favBtn.classList.add('liked');
        favBtn.innerHTML = '<i class="fas fa-heart"></i>';
    } else {
        favBtn.classList.remove('liked');
        favBtn.innerHTML = '<i class="far fa-heart"></i>';
    }
}

// ============================================
// FAVORITOS
// ============================================

function toggleFavorite(recipeId, button) {
    if (favorites.includes(recipeId)) {
        favorites = favorites.filter(id => id !== recipeId);
        button.classList.remove('liked');
        if (button.querySelector('i').classList.contains('fas')) {
            button.innerHTML = '<i class="far fa-heart"></i>';
        }
    } else {
        favorites.push(recipeId);
        button.classList.add('liked');
        if (button.querySelector('i').classList.contains('far')) {
            button.innerHTML = '<i class="fas fa-heart"></i>';
        }
    }

    // Guardar en localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // Actualizar UI
    updateFavoritesUI();
    
    // Animación
    button.style.animation = 'none';
    setTimeout(() => {
        button.style.animation = 'pulse 0.6s ease';
    }, 10);
}

function updateFavoritesUI() {
    const favoritesList = document.getElementById('favorites-list');
    const emptyState = document.getElementById('empty-favorites');

    if (favorites.length === 0) {
        favoritesList.style.display = 'none';
        emptyState.style.display = 'flex';
        return;
    }

    emptyState.style.display = 'none';
    favoritesList.style.display = 'flex';
    favoritesList.innerHTML = '';

    favorites.forEach(favId => {
        const recipe = recipes.find(r => r.id === favId);
        if (recipe) {
            const recipeItem = createRecipeItemElement(recipe, favId);
            favoritesList.appendChild(recipeItem);
        }
    });
}

function createRecipeItemElement(recipe, recipeId) {
    const item = document.createElement('div');
    item.className = 'recipe-item';
    item.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}">
        <div class="recipe-item-info">
            <h4>${recipe.title}</h4>
            <p>${recipe.time} • ${recipe.calories}</p>
            <span class="difficulty">${recipe.difficulty}</span>
        </div>
        <button class="favorite-mini-btn liked" data-recipe-id="${recipeId}">
            <i class="fas fa-heart"></i>
        </button>
    `;

    const favBtn = item.querySelector('.favorite-mini-btn');
    favBtn.addEventListener('click', () => {
        toggleFavorite(recipeId, favBtn);
    });

    return item;
}

// ============================================
// DETALLES DE RECETA
// ============================================

function showRecipeDetail(recipe) {
    const detail = `
Receta: ${recipe.title}

${recipe.description}

Tiempo: ${recipe.time}
Calorías: ${recipe.calories}
Porciones: ${recipe.servings}
Dificultad: ${recipe.difficulty}

⭐ ${recipe.rating} (${recipe.reviews} reseñas)

INGREDIENTES:
${recipe.ingredients ? recipe.ingredients.map(ing => '• ' + ing).join('\n') : 'Ingredientes no disponibles'}

INSTRUCCIONES:
${recipe.instructions ? recipe.instructions.map((inst, i) => `${i + 1}. ${inst}`).join('\n') : 'Instrucciones no disponibles'}
    `;

    alert(detail);
}

// ============================================
// ANIMACIONES
// ============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(1);
        }
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .recipe-card {
        animation: slideIn 0.4s ease;
    }

    .recipe-item {
        animation: slideIn 0.3s ease;
    }
`;
document.head.appendChild(style);

// ============================================
// TOUCH FEEDBACK
// ============================================

document.addEventListener('touchstart', (e) => {
    if (e.target.closest('.category-card, .category-full-item, .recipe-item, .btn, .nav-item')) {
        e.target.closest('.category-card, .category-full-item, .recipe-item, .btn, .nav-item').style.opacity = '0.8';
    }
});

document.addEventListener('touchend', (e) => {
    if (e.target.closest('.category-card, .category-full-item, .recipe-item, .btn, .nav-item')) {
        e.target.closest('.category-card, .category-full-item, .recipe-item, .btn, .nav-item').style.opacity = '1';
    }
});
