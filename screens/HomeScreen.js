import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('Menu'); 
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/BackgroundAcceuil.jpg')}
                style={styles.background}
                resizeMode="cover"
                onLoad={() => setImageLoaded(true)} // Détection du chargement de l'image
            >
                {!imageLoaded ? ( 
                    <ActivityIndicator size="large" color="white" style={styles.loader} />
                ) : (
                    <View style={styles.overlay}>
                        {/* Logo */}
                        <Image
                            source={require('../assets/logo.png')}
                            style={styles.logo}
                        />
                        {/* Phrase d'accroche */}

                        {/* Indicateur de chargement */}
                        <ActivityIndicator size="large" color="#37bcaa" style={styles.loader} />
                    </View>
                )}
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    logo: {
        width: 180,
        height: 180,
        marginBottom: 0,
        marginTop: -300,
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#4e757a',
        textAlign: 'center',
        flexWrap: 'wrap',
        marginHorizontal: 10,
        paddingHorizontal: 10,
    },
    loader: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -25 }, { translateY: -25 }], // Centre le loader
    },
});

export default HomeScreen;
