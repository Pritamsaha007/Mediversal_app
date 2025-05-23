/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl,
} from 'react-native';

import OnboardingSteps from '../../components/Banners/OnboardingBanner';
import PromoBanner from '../../components/Banners/PromoBanner';
import AuthenticIcon from './assests/svgs/glass security shield.svg';
import PharmacyIcon from './assests/svgs/Product box.svg';
import VerifiedIcon from './assests/svgs/medical doctor.svg';
import LabIcon from './assests/svgs/Reward badge with star and two ribbons.svg';
import PriscriptionSVG from './assests/svgs/Icon.svg';
import LinearGradient from 'react-native-linear-gradient';
import Vector1 from './assests/svgs/Vector.svg';
import Vector2 from './assests/svgs/Vector (1).svg';
import Vector3 from './assests/svgs/Vector (2).svg';
import Vector4 from './assests/svgs/Vector (3).svg';
import Vector5 from './assests/svgs/Vector (4).svg';
import Vector6 from './assests/svgs/Vector (5).svg';

import ProductCard from '../../components/cards/ProductCard';
import CategoryCard from '../../components/cards/CategoryCard';

import Sneezing from './assests/svgs/Sneezing.svg';
import Acitdity from './assests/svgs/Gastric.svg';
import Headache from './assests/svgs/Dizzy.svg';
import MuscleCramps from './assests/svgs/Muscle cramps.svg';
import Dehydration from './assests/svgs/Dehydration.svg';
import Burn from './assests/svgs/Burn.svg';
import BlockedNose from './assests/svgs/Burn.svg';
import JointPain from './assests/svgs/Pain in joints.svg';
import CircleCard from '../../components/cards/CircularCards';
import SunDrop from './assests/svgs/Card 1.svg';
import ImmunityCard from '../../components/cards/ImmunityCard';
import styles from './index.styles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';
import MediversalLogo from '../../assests/svgs/Logo.svg';
import {ProductCardProps} from '../../types';
import {getProducts} from '../../Services/pharmacy';
import useProductStore from '../../store/productsStore';
import ProductCardShimmer from '../../components/cards/ProductCard/skeleton';
import {Fonts} from '../../styles/fonts';

const PharmacyScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const {setProducts, cardProducts, getOriginalProduct} = useProductStore();

  const fetchProducts = useCallback(() => {
    setLoading(true);
    getProducts()
      .then(response => {
        setProducts(response.data);
        setLoading(false);
        setRefreshing(false);
        console.log('Products:', response.data);
      })
      .catch(error => {
        setLoading(false);
        setRefreshing(false);
        console.error('Error fetching products:', error);
      });
  }, [setProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchProducts();
  };

  const handleProductPress = (cardProduct: ProductCardProps['product']) => {
    const originalProduct = getOriginalProduct(cardProduct.id);
    navigation.navigate('UploadScreen', {
      product: originalProduct,
    });
  };

  console.log(cardProducts);
  const renderProductShimmer = () => <ProductCardShimmer />;
  const skeletonItems = loading
    ? Array(5)
        .fill(0)
        .map((_, index) => ({id: `skeleton-${index}`}))
    : cardProducts;

  const renderProduct = ({item}: {item: ProductCardProps['product']}) => (
    <TouchableOpacity onPress={() => handleProductPress(item)}>
      <ProductCard
        product={item}
        onAddToCart={(id: string, quantity: number) => {
          console.log(`Product ${id} added to cart: ${quantity} items`);
        }}
      />
    </TouchableOpacity>
  );

  const renderProductForTrending = ({
    item,
  }: {
    item: ProductCardProps['product'];
  }) => (
    <TouchableOpacity onPress={() => handleProductPress(item)}>
      <ProductCard
        product={item}
        borderColor={'#2D9CDB'}
        buttonColor={'#2D9CDB'}
        backgroundColor={'#E8F4F7'}
        onAddToCart={(id: string, quantity: number) => {
          console.log(`Product ${id} added to cart: ${quantity} items`);
        }}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{display: 'flex', flexDirection: 'column'}}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#0088B1']} // Color of the refresh indicator
            tintColor={'#0088B1'} // iOS specific color
          />
        }>
        <View style={styles.safeArea}>
          <OnboardingSteps />
          <PromoBanner />

          <View style={styles.containerx}>
            <View style={styles.item}>
              <AuthenticIcon width={34} height={34} />
              <Text style={styles.text}>100% Authentic</Text>
            </View>
            <View style={styles.item}>
              <PharmacyIcon width={34} height={34} />
              <Text style={styles.text}>Licensed Pharmacy</Text>
            </View>
            <View style={styles.item}>
              <VerifiedIcon width={34} height={34} />
              <Text style={styles.text}>Verified Doctors</Text>
            </View>
            <View style={styles.item}>
              <LabIcon width={34} height={34} />
              <Text style={styles.text}>Certified Lab Tests</Text>
            </View>
          </View>

          <LinearGradient
            colors={['#0088B1', '#F8F8F8']}
            start={{x: 0, y: 1}}
            end={{x: 0, y: -1}}
            style={styles.priscriptionContainer}>
            <View style={{flexDirection: 'row', gap: 5}}>
              <PriscriptionSVG width={25} height={32} strokeWidth={2} />
              <View>
                <Text style={styles.priscriptionText}>Upload Prescription</Text>
                <Text style={styles.subtitle}>Quick order with Rx</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>Upload Now</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View>
          <LinearGradient
            colors={['#FFE3C1', '#FFFFFF']}
            locations={[0, 0.3, 1]}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={styles.gradientBox}>
            <Vector1 style={styles.vector1} width={40} height={40} />
            <Vector2 style={styles.vector2} width={30} height={30} />
            <Vector3 style={styles.vector3} width={30} height={30} />
            <Vector4 style={styles.vector4} width={30} height={30} />
            <Vector5 style={styles.vector5} width={40} height={40} />
            <Vector6 style={styles.vector6} width={30} height={30} />
            <View style={styles.gradientContent}>
              <Text style={styles.title}>Super Offers</Text>
              <Text style={styles.highlight}>SUPER SAVINGS</Text>
              <Text style={styles.subtext}>
                Limited-time deals on medicines. Grab them before they're gone!
              </Text>
            </View>
            {loading ? (
              <FlatList
                data={skeletonItems}
                renderItem={renderProductShimmer}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.productList}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            ) : (
              <FlatList
                data={cardProducts}
                renderItem={renderProduct}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.productList}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            )}

            <Text style={{fontFamily: Fonts.JakartaRegular, fontSize: 12}}>
              Browse by Category
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 5,
                marginTop: 10,
              }}>
              <CategoryCard
                SvgImage={Sneezing}
                title="Cold & Cough"
                placement="bottom"
              />
              <CategoryCard
                SvgImage={Acitdity}
                title="Acidity"
                placement="center"
              />
              <CategoryCard
                SvgImage={Headache}
                title="Headache"
                placement="bottom"
              />
              <CategoryCard
                SvgImage={MuscleCramps}
                title="Muscle Cramps"
                placement="top"
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 5,
                marginTop: 10,
                marginBottom: 10,
              }}>
              <CategoryCard
                SvgImage={Dehydration}
                title="Dehydration"
                placement="bottom"
              />
              <CategoryCard
                SvgImage={Burn}
                title="Burn Care"
                placement="bottom"
              />
              <CategoryCard
                SvgImage={BlockedNose}
                title="Blocked Nose"
                placement="bottom"
              />
              <CategoryCard
                SvgImage={JointPain}
                title="Joint Pain"
                placement="bottom"
              />
            </View>

            <Text style={{fontFamily: Fonts.JakartaRegular, fontSize: 12}}>
              Trending Medicines
            </Text>

            {loading ? (
              <FlatList
                data={skeletonItems}
                renderItem={renderProductShimmer}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.productList}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            ) : (
              <FlatList
                data={cardProducts}
                renderItem={renderProductForTrending}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.productList}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            )}
            <Text style={{fontFamily: Fonts.JakartaRegular, fontSize: 12}}>
              Featured Brands
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 5,
                marginTop: 10,
                marginBottom: 10,
              }}>
              <CircleCard logo={SunDrop} size={110} />
              <CircleCard logo={SunDrop} size={110} />
              <CircleCard logo={SunDrop} size={110} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 5,
                marginTop: 10,
                marginBottom: 10,
              }}>
              <CircleCard logo={SunDrop} size={110} />
              <CircleCard logo={SunDrop} size={110} />
              <CircleCard logo={SunDrop} size={110} />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('AllProducts')}>
                <Text style={styles.buttonText}>View all Medicines</Text>
              </TouchableOpacity>
            </View>

            <Text style={{fontFamily: Fonts.JakartaRegular, fontSize: 12}}>
              Stay Informed, Stay Healthy
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                flexDirection: 'row',
                gap: 10,
                paddingHorizontal: 5,
                marginTop: 10,
                marginBottom: 10,
              }}>
              <ImmunityCard
                title="5 Simple Ways to Boost Your Immunity Naturally"
                subtitle="Learn how daily habits like staying hydrated, eating colorful veggies, and getting enough sleep can strengthen your immune system."
                buttonText="Read More"
                onPressReadMore={() => console.log('Read More clicked')}
              />
              <ImmunityCard
                title="The Power of Antioxidants: Foods to Include in Your Diet"
                subtitle="Discover how fruits and vegetables rich in antioxidants can protect your body from free radicals and enhance your overall health."
                buttonText="Read More"
                onPressReadMore={() => console.log('Read More clicked')}
              />
              <ImmunityCard
                title="Stress Management Techniques for a Healthier Life"
                subtitle="Uncover effective strategies such as meditation and yoga that can help reduce stress and improve your immune function."
                buttonText="Read More"
                onPressReadMore={() => console.log('Read More clicked')}
              />
            </ScrollView>
            <View style={styles.imagecontainer}>
              <Text style={{fontSize: 8}}>Powered By</Text>
              <MediversalLogo style={styles.logo} />
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PharmacyScreen;
