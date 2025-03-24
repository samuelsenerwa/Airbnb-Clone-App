import { View, Text } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { Link, Stack } from 'expo-router'
import ExploreHeader from '@/components/ExploreHeader'
import Listings from '@/components/Listings'
import listingData from "@/assets/data/airbnb-listings.json"
import { PropertyListings } from '@/interface/listings'
import { SafeAreaView } from 'react-native-safe-area-context'
import ListingsMap from '@/components/ListingsMap'
import ListingGeoData from '@/assets/data/airbnb-listings.geo.json'

const Page = () => {

    const [category, setCategory] = useState<string>('Tiny homes');
    const items = useMemo(() => listingData as PropertyListings[], [])

    const onDataChanged = (category: string) => {
        setCategory(category);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <Stack.Screen
                options={{
                    header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
                }}
            />
            {/* <Listings listings={items} category={category} /> */}
            <ListingsMap listings={ListingGeoData} />
        </SafeAreaView>
    )
}

export default Page