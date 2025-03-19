import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, FlatList, ListRenderItem, TouchableOpacity, Image } from 'react-native'
import { defaultStyles } from '@/constants/Styles';
import { Link } from 'expo-router';
import { Listings } from '@/interface/listings';
import { Ionicons } from '@expo/vector-icons';


interface Props {
    listings: Listings[];
    category: string;
}

const Listings = ({ listings: items, category }: Props) => {
    const [loading, setLoading] = useState(false);
    const listRef = useRef<FlatList>(null)

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false)
        }, 200)
    }, [category]);

    const renderRow: ListRenderItem<Listings> = ({ item }) => (
        <Link href={`/listing/${item.id}`} asChild>
            <TouchableOpacity>
                <View style={styles.listing}>
                    <Image source={{ uri: item.medium_url }} style={styles.image} />
                    <TouchableOpacity style={{ position: 'absolute', right: 30, top: 30 }}>
                        <Ionicons name='heart-outline' size={24} color={'#000'} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 16, fontFamily: 'lex-semi' }}>{item.name}</Text>
                        <View style={{ flexDirection: 'row', gap: 4 }}>
                            <Ionicons name='star' size={16} />
                            <Text style={{ fontFamily: 'lex-semi' }}>{item.review_scores_rating / 20}</Text>
                        </View>
                        <Text style={{ fontSize: 16, fontFamily: 'lex-semi' }}>{item.room_type}</Text>

                        <View style={{ flexDirection: 'row', gap: 4 }}>
                            <Text style={{ fontFamily: 'mon-sb' }}>€ {item.price}</Text>
                            <Text style={{ fontFamily: 'lex' }}>night</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    );

    return (
        <View style={defaultStyles.container}>
            <FlatList
                renderItem={renderRow}
                ref={listRef}
                data={loading ? [] : items}

            />
        </View>
    );
};

const styles = StyleSheet.create({
    listing: {
        padding: 16,
        gap: 10,
        marginVertical: 16
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 10,
    },

})


export default Listings