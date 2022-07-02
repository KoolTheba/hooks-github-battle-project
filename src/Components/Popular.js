import React from 'react'
import PropTypes from 'prop-types'

import { fetchPopularRepos } from '../utils/api'

import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'
import Card from './Card'
import Loading from './Loading'
import Tooltip from './Tooltip'
function LanguagesNav ({selected, onUpdateLanguage}){
    const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']
    return (
        <ul className='flex-center'>
            {languages.map(lang => (
                <li key={lang}>
                    <button 
                      className='btn-clear nav-link' 
                      style={lang === selected ? {color: 'rgb(187, 46, 31)'} : null}
                      onClick={() => onUpdateLanguage(lang)}>
                      {lang}
                    </button>
                </li>
            ))}
        </ul>
    )
}

LanguagesNav.propTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired
}

function ReposGrid ({ repos }){
    return (
        <ul className='grid space-around'>
            {repos.map((repo, index) => {
                const { owner, html_url, stargazers_count, forks, open_issues} = repo
                const { login, avatar_url } = owner

                return (
                    <li key={html_url} className='repo bg-light'>
                        <Card
                            header={`#${index + 1}`}
                            avatar={avatar_url}
                            href={html_url}
                            name={login}
                        >
                        <ul className='card-list'>
                            <li>
                                <Tooltip text="Github username">
                                    <FaUser color='rgb(255, 191, 116)' size={22} />
                                    <a href={`https://github.com/${login}`}>
                                    </a>
                                    {login}
                                </Tooltip>
                            </li>
                            <li>
                                <FaStar color='rgb(255, 215, 0)' size={22} />
                                {stargazers_count.toLocaleString()} stars
                            </li>
                            <li>
                                <FaCodeBranch color='rgb(129, 195, 245)' size={22} />
                                {forks.toLocaleString()} forks
                            </li>
                            <li>
                                <FaExclamationTriangle color='rgb(241, 138, 147)' size={22} />
                                {open_issues.toLocaleString()} open
                            </li>
                        </ul>
                        </Card>
                    </li>
                )
            })}
        </ul>
    )
}

ReposGrid.propTypes = {
    repos: PropTypes.array.isRequired
}

export default class Popular extends React.Component {
    state = {
        selectedLanguage: 'All',
        repos: {

        },
        error: null
    }

    componentDidMount(){
        this.updateLanguage(this.state.selectedLanguage)
    }

    updateLanguage = (selectedLanguage) => {
        this.setState({
            selectedLanguage,
            error: null
        })

        if(!this.state.repos[selectedLanguage]){
            fetchPopularRepos(selectedLanguage)
                .then(data => {
                    this.setState(({ repos }) => ({
                        repos: {
                            ...repos,
                            [selectedLanguage]: data
                        }
                    }))
                })
                .catch(() => {
                    this.setState({
                        error: `There was an error fetching the repositories of ${selectedLanguage}`
                    })
                })
        }
    }

    isLoading = () => {
        const { selectedLanguage, repos, error } = this.state
        return !repos[selectedLanguage] && error === null
    }

    render(){
        const {selectedLanguage, repos, error} = this.state

        return (
            <React.Fragment>
                <LanguagesNav 
                    selected={selectedLanguage} 
                    onUpdateLanguage={this.updateLanguage}
                />
                {this.isLoading() && <Loading text='Fetching repos...'/>}

                {error && <p className='center-text error'>{error}</p>}

                {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]}/>}
            </React.Fragment>
        )
    }
}