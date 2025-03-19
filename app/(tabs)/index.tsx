import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, Stack } from 'expo-router'
import ExploreHeader from '@/components/ExploreHeader'
import Listings from '@/components/Listings'

const Page = () => {

    const [category, setCategory] = useState<string>('Tiny homes');

    const onDataChanged = (category: string) => {
        setCategory(category);
    };

    useEffect(() => {
        // reload the listings
    }, [category])

    return (
        <View style={{ flex: 1, marginTop: 80 }}>
            <Stack.Screen
                options={{
                    header: () => <ExploreHeader onCategoryChanged={onDataChanged} />
                }}
            />
            <Listings listings={[]} category={category} />
        </View>
    )
}

export default Page