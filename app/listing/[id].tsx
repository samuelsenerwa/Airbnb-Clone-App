import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import listingData from '@/assets/data/airbnb-listings.json'
import { PropertyListings } from '@/interface/listings'
import Animated from 'react-native-reanimated'

const { width } = Dimensions.get('window')
const IMG_HEIGHT = 300;

const Page = () => {
    const { id } = useLocalSearchParams<{ id: string }>()
    const listing = (listingData as PropertyListings[]).find((item) => item.id === id)

    return (
        <View style={styles.container}>
            <Animated.ScrollView>
                <Animated.Image
                    source={{ uri: listing?.xl_picture_url }}
                    style={styles.image}
                />
            </Animated.ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        height: IMG_HEIGHT,
        width,
    }
})

export default Page