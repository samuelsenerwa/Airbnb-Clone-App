import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useMemo, useRef } from 'react'
import { PropertyListings } from '@/interface/listings'
import BottomSheet from '@gorhom/bottom-sheet';
import Listings from './Listings';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface Props {
    listings: PropertyListings[];
    category: string;
}

const ListingsBottomSheet = ({ listings, category }: Props) => {

    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['10%', '100%'], []);
    const [refresh, setRefresh] = React.useState(0);

    const showMap = () => {
        bottomSheetRef.current?.collapse();
        setRefresh(refresh + 1);
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                handleIndicatorStyle={{ backgroundColor: Colors.grey }}
                enablePanDownToClose={false}
                index={1}
                style={styles.sheetContainer}
            >
                <View style={{ flex: 1 }}>
                    <Listings listings={listings} category={category} refresh={refresh} />
                    <View style={styles.absoluteBtn}>
                        <TouchableOpacity
                            onPress={showMap}
                            style={styles.btn}
                        >
                            <Text style={{ fontFamily: 'lex-semi', color: '#fff' }}>Map</Text>
                            <Ionicons name="map" size={20} color={'#fff'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </BottomSheet>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    absoluteBtn: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        alignItems: 'center'
    },
    btn: {
        backgroundColor: Colors.dark,
        padding: 16,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 30,
        gap: 8,
    },
    sheetContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 1,
            height: 1,
        },
    }
});

export default ListingsBottomSheet