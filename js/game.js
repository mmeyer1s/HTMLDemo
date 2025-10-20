/**
 * Great Emu War - Game Logic
 * 
 * This file contains the complete game logic for the interactive emu war game.
 * Players control an emu using arrow keys to destroy crops while avoiding bullets.
 * 
 * Game Features:
 * - Arrow key movement controls
 * - Collision detection for crops and bullets
 * - AI soldiers that shoot at emus
 * - Score tracking and lives system
 * - Victory/defeat conditions
 * - Allied emu AI for distraction
 * 
 * Author: Great Emu War Project
 * Version: 1.0.0
 */

/**
 * Main game function that returns an Alpine.js data object
 * Contains all game state, methods, and logic
 * 
 * @returns {Object} Alpine.js reactive data object
 */
function emuGame() {
    return {
        // =======================
        // GAME STATE VARIABLES
        // =======================
        
        /** Current game state - controls which screen is shown */
        gameState: 'instructions', // 'instructions', 'playing', 'victory', 'gameOver'
        
        /** Player's current score */
        score: 0,
        
        /** Player's remaining lives */
        lives: 3,
        
        /** Number of crops destroyed by the player */
        cropsDestroyed: 0,
        
        // =======================
        // GAME ARENA SETTINGS
        // =======================
        
        /** Game arena width in pixels */
        arenaWidth: 800,
        
        /** Game arena height in pixels */
        arenaHeight: 350,
        
        // =======================
        // PLAYER CHARACTER
        // =======================
        
        /** Player emu object with position and state */
        player: {
            x: 100,              // X position in pixels
            y: 150,              // Y position in pixels
            direction: 1,        // 1 for right, -1 for left (affects sprite direction)
            moving: false,       // Whether the emu is currently moving (for animation)
            speed: 5             // Movement speed in pixels per frame
        },
        
        // =======================
        // GAME OBJECTS ARRAYS
        // =======================
        
        /** Array of wheat crops to be destroyed */
        crops: [],
        
        /** Array of soldier positions */
        soldiers: [],
        
        /** Array of active bullets */
        bullets: [],
        
        /** Array of AI-controlled emus */
        otherEmus: [],
        
        // =======================
        // GAME TIMERS
        // =======================
        
        /** Main game loop interval ID */
        gameLoop: null,
        
        /** Bullet shooting timer interval ID */
        bulletTimer: null,
        
        // =======================
        // INITIALIZATION METHODS
        // =======================
        
        /**
         * Initialize the game component
         * Called automatically by Alpine.js when component is created
         */
        init() {
            this.setupGame();
        },
        
        /**
         * Set up initial game state
         * Creates all game objects in their starting positions
         */
        setupGame() {
            // Initialize crops in a semi-random grid pattern
            this.crops = [];
            for (let i = 0; i < 20; i++) {
                this.crops.push({
                    id: i,
                    // Position crops in a 5x4 grid with some randomization
                    x: (i % 5) * 150 + 200 + Math.random() * 50,
                    y: Math.floor(i / 5) * 80 + 50 + Math.random() * 30,
                    destroyed: false
                });
            }
            
            // Initialize soldiers at strategic positions
            this.soldiers = [
                { id: 1, x: 50, y: 50 },      // Top-left corner
                { id: 2, x: 750, y: 100 },    // Top-right area
                { id: 3, x: 400, y: 300 }     // Bottom-center
            ];
            
            // Initialize other emus for distraction
            this.otherEmus = [
                { id: 1, x: 200, y: 200 },
                { id: 2, x: 600, y: 150 },
                { id: 3, x: 300, y: 250 },
                { id: 4, x: 500, y: 100 }
            ];
            
            // Reset game state
            this.bullets = [];
            this.score = 0;
            this.lives = 3;
            this.cropsDestroyed = 0;
            
            // Reset player position
            this.player.x = 100;
            this.player.y = 150;
        },
        
        // =======================
        // GAME FLOW METHODS
        // =======================
        
        /**
         * Start a new game
         * Transitions from instructions to playing state
         */
        startGame() {
            this.gameState = 'playing';
            this.setupGame();
            this.startGameLoop();
        },
        
        /**
         * Start the main game loop and timers
         * Begins the game's update cycle
         */
        startGameLoop() {
            // Main game loop - runs at ~20 FPS
            this.gameLoop = setInterval(() => {
                this.updateGame();
            }, 50);
            
            // Bullet shooting timer - soldiers shoot every 2 seconds
            this.bulletTimer = setInterval(() => {
                this.shootBullets();
            }, 2000);
        },
        
        /**
         * Stop all game timers
         * Called when game ends or is paused
         */
        stopGameLoop() {
            if (this.gameLoop) {
                clearInterval(this.gameLoop);
                this.gameLoop = null;
            }
            if (this.bulletTimer) {
                clearInterval(this.bulletTimer);
                this.bulletTimer = null;
            }
        },
        
        // =======================
        // GAME UPDATE METHODS
        // =======================
        
        /**
         * Main game update loop
         * Updates all game objects and checks for game end conditions
         */
        updateGame() {
            // Only update if game is actively being played
            if (this.gameState !== 'playing') return;
            
            // Update bullet positions and remove off-screen bullets
            this.updateBullets();
            
            // Check for collisions between game objects
            this.checkCollisions();
            
            // Move AI-controlled emus
            this.moveOtherEmus();
            
            // Check if player has won (all crops destroyed)
            if (this.cropsDestroyed >= 20) {
                this.gameState = 'victory';
                this.stopGameLoop();
            }
            
            // Check if player has lost (no lives remaining)
            if (this.lives <= 0) {
                this.gameState = 'gameOver';
                this.stopGameLoop();
            }
        },
        
        /**
         * Update bullet positions and remove off-screen bullets
         * Called every game loop iteration
         */
        updateBullets() {
            this.bullets = this.bullets.filter(bullet => {
                // Move bullet based on its velocity
                bullet.x += bullet.vx;
                bullet.y += bullet.vy;
                
                // Remove bullets that have left the game arena
                return !(bullet.x < 0 || bullet.x > this.arenaWidth || 
                        bullet.y < 0 || bullet.y > this.arenaHeight);
            });
        },
        
        // =======================
        // INPUT HANDLING
        // =======================
        
        /**
         * Handle keyboard input for player movement
         * Responds to arrow key presses
         * 
         * @param {KeyboardEvent} event - The keyboard event
         */
        handleKeyPress(event) {
            // Only process input during active gameplay
            if (this.gameState !== 'playing') return;
            
            const key = event.key;
            let moved = false;
            
            // Process arrow key input
            switch (key) {
                case 'ArrowUp':
                    if (this.player.y > 0) {
                        this.player.y -= this.player.speed;
                        moved = true;
                    }
                    break;
                case 'ArrowDown':
                    if (this.player.y < this.arenaHeight - 40) {
                        this.player.y += this.player.speed;
                        moved = true;
                    }
                    break;
                case 'ArrowLeft':
                    if (this.player.x > 0) {
                        this.player.x -= this.player.speed;
                        this.player.direction = -1; // Face left
                        moved = true;
                    }
                    break;
                case 'ArrowRight':
                    if (this.player.x < this.arenaWidth - 40) {
                        this.player.x += this.player.speed;
                        this.player.direction = 1; // Face right
                        moved = true;
                    }
                    break;
            }
            
            // If player moved, show movement animation and prevent default
            if (moved) {
                this.player.moving = true;
                // Stop movement animation after brief delay
                setTimeout(() => {
                    this.player.moving = false;
                }, 200);
                
                event.preventDefault(); // Prevent page scrolling
            }
        },
        
        // =======================
        // COMBAT SYSTEM
        // =======================
        
        /**
         * Make soldiers shoot bullets at targets
         * Called periodically by the bullet timer
         */
        shootBullets() {
            // Only shoot during active gameplay
            if (this.gameState !== 'playing') return;
            
            this.soldiers.forEach(soldier => {
                // Choose random target (player or AI emu)
                const targets = [this.player, ...this.otherEmus];
                const target = targets[Math.floor(Math.random() * targets.length)];
                
                // Calculate direction vector to target
                const dx = target.x - soldier.x;
                const dy = target.y - soldier.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Normalize direction and set bullet speed
                const speed = 3;
                const vx = (dx / distance) * speed;
                const vy = (dy / distance) * speed;
                
                // Create new bullet
                this.bullets.push({
                    id: Date.now() + Math.random(), // Unique ID
                    x: soldier.x + 15,              // Start near soldier center
                    y: soldier.y + 15,
                    vx: vx,                         // X velocity
                    vy: vy                          // Y velocity
                });
            });
        },
        
        // =======================
        // COLLISION DETECTION
        // =======================
        
        /**
         * Check for collisions between game objects
         * Handles crop destruction and bullet hits
         */
        checkCollisions() {
            // Check player collision with crops
            this.crops.forEach(crop => {
                if (!crop.destroyed && this.isColliding(this.player, crop, 30)) {
                    crop.destroyed = true;
                    this.cropsDestroyed++;
                    this.score += 10;
                }
            });
            
            // Check player collision with bullets
            this.bullets = this.bullets.filter((bullet, bulletIndex) => {
                if (this.isColliding(this.player, bullet, 20)) {
                    this.lives--;
                    
                    // Visual feedback for getting hit
                    this.player.moving = true;
                    setTimeout(() => {
                        this.player.moving = false;
                    }, 500);
                    
                    return false; // Remove this bullet
                }
                return true; // Keep this bullet
            });
        },
        
        /**
         * Check if two objects are colliding
         * Uses distance-based collision detection
         * 
         * @param {Object} obj1 - First object with x, y properties
         * @param {Object} obj2 - Second object with x, y properties
         * @param {number} threshold - Collision distance threshold
         * @returns {boolean} True if objects are colliding
         */
        isColliding(obj1, obj2, threshold = 25) {
            const dx = obj1.x - obj2.x;
            const dy = obj1.y - obj2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance < threshold;
        },
        
        // =======================
        // AI BEHAVIOR
        // =======================
        
        /**
         * Move AI-controlled emus randomly
         * Provides distraction for the player and adds life to the game
         */
        moveOtherEmus() {
            this.otherEmus.forEach(emu => {
                // 10% chance to move each frame (creates natural, sporadic movement)
                if (Math.random() < 0.1) {
                    const direction = Math.random() * Math.PI * 2; // Random direction
                    const speed = 2;
                    
                    // Move in the chosen direction
                    emu.x += Math.cos(direction) * speed;
                    emu.y += Math.sin(direction) * speed;
                    
                    // Keep emus within arena bounds
                    emu.x = Math.max(0, Math.min(this.arenaWidth - 30, emu.x));
                    emu.y = Math.max(0, Math.min(this.arenaHeight - 30, emu.y));
                }
            });
        },
        
        // =======================
        // GAME RESET
        // =======================
        
        /**
         * Reset the game to initial state
         * Called when player wants to play again
         */
        resetGame() {
            this.stopGameLoop();
            this.gameState = 'instructions';
            this.setupGame();
        }
    };
}
