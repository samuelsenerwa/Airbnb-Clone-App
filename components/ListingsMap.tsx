import { View, Text, StyleSheet } from 'react-native'
import React, { memo, useEffect, useRef } from 'react'
import MapView from 'react-native-map-clustering'
import { Marker } from 'react-native-maps'
import { PROVIDER_GOOGLE } from 'react-native-maps'
import { defaultStyles } from '@/constants/Styles'
import { ListingGeo } from '@/interface/listingGeo'
import { useRouter } from 'expo-router'

interface ListingsMapProps {
    listings: any
}

const INITIAL_REGION = {
    latitude: 37.33,
    longitude: -122,
    latitudeDelta: 9,
    longitudeDelta: 9,
};

const ListingsMap = memo(({ listings }: ListingsMapProps) => {

    const router = useRouter();

    const onMarkerSlected = (event: ListingGeo) => {
        router.push(`/listing/${event.properties.id}`)
    }

    const renderCluster = (cluster: any) => {
        const { id, geometry, onPress, properties } = cluster;
        const points = properties.point_count;

        return (
            <Marker
                key={`cluster-${id}`}
                coordinate={{
                    longitude: geometry.coordinates[0],
                    latitude: geometry.coordinates[1],
                }}
                onPress={onPress}
            >
                <View
                    style={styles.marker}
                >
                    <Text
                        style={{
                            color: '#000',
                            textAlign: 'center',
                            fontFamily: 'lex-semi',
                        }}
                    >
                        {points}
                    </Text>
                </View>
            </Marker>
        )
    }

    return (
        <View style={defaultStyles.container}>
            <MapView
                animationEnabled={false}
                style={StyleSheet.absoluteFill}
                provider={PROVIDER_GOOGLE}
                showsUserLocation
                showsMyLocationButton
                initialRegion={INITIAL_REGION}
                clusterColor='#fff'
                clusterTextColor='#000'
                clusterFontFamily='lex-semi'
                renderCluster={renderCluster}
            >
                {listings.features.map((item: ListingGeo) => (
                    <Marker
                        key={item.properties.id}
                        onPress={() => onMarkerSlected(item)}
                        coordinate={{
                            latitude: +item.properties.latitude,
                            longitude: +item.properties.longitude,
                        }}
                    >
                        <View style={styles.marker}>
                            <Text style={styles.mapMarkerPrice}>€ {item.properties.price}</Text>
                        </View>
                    </Marker>
                ))}
            </MapView>
        </View>
    )
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    marker: {
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        elevation: 5,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10,
        },
    },
    mapMarkerPrice: {
        color: '#333',
        fontSize: 14,
        fontFamily: 'lex-semi',
    },

});

export default ListingsMap