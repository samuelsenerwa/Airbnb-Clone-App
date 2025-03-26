import { View, StyleSheet } from 'react-native';
import React, { useMemo, useState } from 'react';
import { Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import ListingsMap from '@/components/ListingsMap';
import ListingsBottomSheet from '@/components/ListingsBottomSheet';
import listingData from '@/assets/data/airbnb-listings.json';
import ListingGeoData from '@/assets/data/airbnb-listings.geo.json';
import { PropertyListings } from '@/interface/listings';

const Page = () => {
    const [category, setCategory] = useState<string>('Tiny homes');
    const items = useMemo(() => listingData as PropertyListings[], []);

    const onDataChanged = (category: string) => {
        setCategory(category);
    };

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
                }}
            />
            {/* Map fills the entire screen */}
            <ListingsMap listings={ListingGeoData} />
            {/* Bottom sheet overlays the map */}
            <View style={styles.bottomSheetContainer}>
                <ListingsBottomSheet listings={items} category={category} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    bottomSheetContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

export default Page;