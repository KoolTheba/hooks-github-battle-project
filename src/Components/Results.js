import React, {useEffect, useReducer} from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Link } from 'react-router-dom'

import { battle } from '../utils/api'

import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaUser } from 'react-icons/fa'
import Card from './Card'
import Loading from './Loading'
import Tooltip from './Tooltip'

function ProfileList ({ profile }){
    return(
        <ul className='card-list'>
            <li>
                <FaUser color='rgb(239, 115, 115)' size={22} />
                {profile.name}
            </li>
            {profile.location && (
            <li>
                <Tooltip text="User's location">
                    <FaCompass color='rgb(144, 115, 255)' size={22} />
                    {profile.location}
                </Tooltip>
            </li>
            )}
            {profile.company && (
            <li>
                <Tooltip text="User's company">
                    <FaBriefcase color='#795548' size={22} />
                    {profile.company}
                </Tooltip>
            </li>
            )}
            <li>
                <FaUsers color='rgb(129, 195, 245)' size={22} />
                {profile.followers.toLocaleString()} followers
            </li>
            <li>
                <FaUserFriends color='rgb(64, 183, 95)' size={22} />
                {profile.following.toLocaleString()} following
            </li>
        </ul>
    )
}

ProfileList.propTypes = {
    profile: PropTypes.object.isRequired
}


const battleResultsReducer = (state, action) => {
    if(action.type === 'data'){
        return {
            ...state,
            loading: false,
            error: null,
            winner: action.players[0],
            loser: action.players[1]
        }
    } else if(action.type === 'error'){
        return {
            ...state,
            loading: false,
            error: action.message
        }
    } else {
        throw new Error('This action does not exist')
    }
}

const initialState = {
    winner: null,
    loser: null,
    loading: false,
    error: null
}

const Results = ({location}) => {
    const [state, dispatch] = useReducer(
        battleResultsReducer,
        initialState
    )

    const { playerOne, playerTwo } = queryString.parse(location.search)

    useEffect(() => {
        battle([ playerOne, playerTwo ])
            .then(players => {
                dispatch({ type: 'data', players})
            })
            .catch(({message}) => {
                dispatch({ type: 'error', message})
            })
    }, [playerOne, playerTwo])

    if(state.error === null && !state.winner){
        return <Loading text='Battling' />
    }

    if(state.error){
        return (
            <>
                <p className='center-text error'>{state.error}</p>
                <Link
                    className='btn light-btn btn-space'
                    to='/battle'
                >
                Reset
                </Link>
            </>
        )
    }

    const {winner, loser} = state

    return (
        winner && loser &&
            <>
            <div className='grid space-around container-sm'>
                <Card 
                    header={winner.score === loser.score ? 'Tie' : 'Winner'}
                    subheader={`Score: ${winner.score.toLocaleString()}`}
                    avatar={winner.profile.avatar_url}
                    href={winner.profile.html_url}
                    name={winner.profile.login}
                >
                <ProfileList profile={winner.profile}/>
                </Card>
                <Card
                    header={winner.score === loser.score ? 'Tie' : 'Loser'}
                    subheader={`Score: ${loser.score.toLocaleString()}`}
                    avatar={loser.profile.avatar_url}
                    href={loser.profile.html_url}
                    name={loser.profile.login}
                >
                <ProfileList profile={loser.profile}/>
                </Card>
            </div>
            <Link
                className='btn dark-btn btn-space'
                to='/battle'
            >
            Reset
            </Link>
        </>
    )
}

export default Results