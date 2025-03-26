import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur'
import Animated, { SlideInDown } from 'react-native-reanimated';
import { defaultStyles } from '@/constants/Styles';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Page = () => {
    const router = useRouter();

    const onClearAll = () => {

    };

    return (
        <BlurView
            intensity={70}
            tint='systemMaterialLight'
            experimentalBlurMethod='dimezisBlurView'
            style={styles.container}>
            <Text>Book</Text>

            {/* Footer */}
            <Animated.View
                style={defaultStyles.footer}
                entering={SlideInDown.delay(200)}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={onClearAll}
                        style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontFamily: 'lex-semi', textDecorationLine: 'underline' }}>Clear All</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 50 }]}
                    >
                        <Ionicons
                            name='search-outline'
                            size={24}
                            color={'#fff'}
                            style={defaultStyles.btnIcon}
                        />
                        <Text style={defaultStyles.btnText}>Search</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </BlurView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
    },

});

export default Page