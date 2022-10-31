import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Card extends Component {
    render() {
        return (
            <div class="max-w-sm rounded overflow-hidden shadow-lg float-left w-52 pt-2 border-black">
                <img class=" pr-1 pl-1" src="http://localhost:8080/plant/downloadImage/64d29067-170a-48f8-a48b-f93e9c4df34d_20221028_190301" alt="Sunset in the mountains" />
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
                    <p class="text-gray-700 text-base">
                        Hello World.
                    </p>
                    <p>Fertilized on: 22/22/2222</p>
                </div>
                <div class="px-6 pt-4 pb-2">
                    <Link class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-cyan-700 mr-2 mb-2" to="/">Details</Link>
                    <Link class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-cyan-700 mr-2 mb-2">Abcd</Link>
                </div>
            </div>
        )
    }
}

export default Card