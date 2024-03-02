import { Client, query } from 'faunadb'

import { FAUNA_SECRET } from './faunaKeys'

const createApartment = async (collection) => {
    const q = query
    const client = new Client({ secret: FAUNA_SECRET, })
    
    
    const createApartmentQuery = client.query(
        q.Get(q.Match(q.Index('get_property_by_title'), collection.title)
        ))
        .then((ret) => { return 'ApartmentExists' })
        .catch((err) => {
            const createApartment = client.query(
                q.Create(q.Collection('properties'), { data: collection })
            )
            return createApartment
        })

    return createApartmentQuery


}

export default createApartment