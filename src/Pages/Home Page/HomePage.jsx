import './HomePage.css'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const GAME_CARDS = [
    {
        name: "Color Colapse",
        imageSrc: "/puzzles/images/color-colapse.png",
        path: "/puzzles/color-colapse"
    },
    {
        name: "Connect 4",
        imageSrc: "/puzzles/images/color-colapse.png",
        path: "/puzzles/connect-4"
    },
]

const HomePage = () => {
    const navigate = useNavigate()

    return (
        <div className="home-page">
            <div className='home-page-games'>
                {GAME_CARDS.map((game, index) => (
                    <div className="home-game-card" key={index} onClick={() => navigate(game.path)}>
                        <img className='home-game-card-img' src={game.imageSrc} alt={game.name} />
                        <p className='home-game-card-name'>{game.name}</p>
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default HomePage