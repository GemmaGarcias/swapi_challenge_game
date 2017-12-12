import axios from 'axios'

export const getPeople = (nextUrl) => {
	const url = nextUrl
	return axios.get(url)
		.then( response => response.data )
}


export const getSpecies = (urlSpecie) => {
	const url = urlSpecie
	return axios.get(url)
		.then( response => response.data )
}

export const getVehicles = (urlVehicle) => {
	const url = urlVehicle
	return axios.get(url)
		.then( response => response.data )
}
