// import {Search} from 'lucide-react-native';
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  Animated,
} from 'react-native';
import useProductStore from '../../../store/productsStore';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
import styles from './index.styles';
import {ProductCardProps} from '../../../types';

interface FilterBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filtered: ProductCardProps['product'][]) => void; // Add this
}

interface CategoryOption {
  key: string;
  label: string;
}

interface SelectedFilters {
  [key: string]: boolean;
}

type SidebarItem =
  | 'Category'
  | 'Salt Name'
  | 'Manufacturer'
  | 'Price Range'
  | 'Availability'
  | 'Prescription Required'
  | 'Special Tags';

const FilterBottomSheet: React.FC<FilterBottomSheetProps> = ({
  visible,
  onClose,
  onApply,
}) => {
  const [selectedCategory, setSelectedCategory] =
    useState<SidebarItem>('Category');
  const [searchText, setSearchText] = useState<string>('');
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({});

  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const {originalProducts} = useProductStore();

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: visible ? 0 : SCREEN_HEIGHT,
      useNativeDriver: true,
    }).start();
  }, [visible, translateY]);

  const sidebarItems: SidebarItem[] = [
    'Category',
    'Salt Name',
    'Manufacturer',
    'Availability',
    'Prescription Required',
    'Special Tags',
  ];

  const optionsData = {
    Category: [
      {key: 'ayurveda', label: 'Ayurveda'},
      {key: 'acupuncture', label: 'Acupuncture'},
      {key: 'homeopathy', label: 'Homeopathy'},
      {key: 'chiropractic', label: 'Chiropractic'},
      {key: 'naturopathy', label: 'Naturopathy'},
      {key: 'reiki', label: 'Reiki'},
      {key: 'massageTherapy', label: 'Massage Therapy'},
    ],
    'Salt Name': [
      {key: 'paracetamol', label: 'Paracetamol'},
      {key: 'ibuprofen', label: 'Ibuprofen'},
      {key: 'aspirin', label: 'Aspirin'},
      {key: 'naproxen', label: 'Naproxen'},
      {key: 'acetaminophen', label: 'Acetaminophen'},
      {key: 'diclofenac', label: 'Diclofenac'},
      {key: 'celecoxib', label: 'Celecoxib'},
      {key: 'meloxicam', label: 'Meloxicam'},
      {key: 'ketoprofen', label: 'Ketoprofen'},
      {key: 'indomethacin', label: 'Indomethacin'},
      {key: 'morphine', label: 'Morphine'},
      {key: 'oxycodone', label: 'Oxycodone'},
      {key: 'hydrocodone', label: 'Hydrocodone'},
      {key: 'fentanyl', label: 'Fentanyl'},
      {key: 'tramadol', label: 'Tramadol'},
    ],
    Manufacturer: [
      {key: 'cipla', label: 'Cipla'},
      {key: 'sunPharma', label: 'Sun Pharmaceutical'},
      {key: 'drReddys', label: 'Dr. Reddys Laboratories'},
      {key: 'lupin', label: 'Lupin Pharmaceuticals'},
      {key: 'aurobindo', label: 'Aurobindo Pharma'},
      {key: 'glenmark', label: 'Glenmark Pharmaceuticals'},
      {key: 'torrent', label: 'Torrent Pharmaceuticals'},
      {key: 'cadila', label: 'Zydus Cadila'},
      {key: 'alkem', label: 'Alkem Laboratories'},
      {key: 'biocon', label: 'Biocon'},
      {key: 'wockhardt', label: 'Wockhardt'},
    ],
    Availability: [
      {key: 'inStock', label: 'In Stock'},
      {key: 'outOfStock', label: 'Out of Stock'},
    ],
    'Prescription Required': [
      {key: 'prescriptionRequired', label: 'Prescription Required'},
      {key: 'noPrescriptionRequired', label: 'No Prescription Required'},
    ],
    'Special Tags': [
      {key: 'sugarFree', label: 'Sugar - Free'},
      {key: 'vegetarian', label: 'Vegetarian'},
      {key: 'lactoseFree', label: 'Lactose - Free'},
      {key: 'glutenFree', label: 'Gluten - Free'},
    ],
  };

  const toggleFilter = (key: string): void => {
    setSelectedFilters(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const hasActiveFilters = (): boolean => {
    return (
      Object.values(selectedFilters).some(filter => filter) ||
      searchText.trim() !== ''
    );
  };
  const applyFilters = () => {
    let filtered = originalProducts;

    const activeFilters = Object.keys(selectedFilters).filter(
      key => selectedFilters[key],
    );

    if (selectedCategory === 'Salt Name' && activeFilters.length) {
      filtered = filtered.filter(product =>
        activeFilters.some(filter =>
          product.Composition?.toLowerCase().includes(filter.toLowerCase()),
        ),
      );
    }
    if (selectedCategory === 'Salt Name' && activeFilters.length) {
      filtered = filtered.filter(product =>
        activeFilters.some(filter =>
          product.Composition?.toLowerCase().includes(filter.toLowerCase()),
        ),
      );
    }

    //  if (selectedCategory === 'Category' && activeFilters.length) {
    //   filtered = filtered.filter(product =>
    //     activeFilters.some(filter =>
    //       product.category?.toLowerCase().includes(filter.toLowerCase()),
    //     ),
    //   );
    // }

    if (selectedCategory === 'Manufacturer' && activeFilters.length) {
      filtered = filtered.filter(product =>
        activeFilters.some(filter =>
          product.ManufacturerName?.toLowerCase().includes(
            filter.toLowerCase(),
          ),
        ),
      );
    }

    // Add logic for other filters similarly...

    const cardFiltered = filtered.map(product => ({
      id: product.productId.toString(),
      name: product.ProductName,
      description: product.ProductInformation || 'No description available',
      quantity: `Available: ${product.StockAvailableInInventory}`,
      delivery: 'Delivery in 2-3 days',
      originalPrice: parseFloat(product.SellingPrice),
      discountedPrice: parseFloat(product.DiscountedPrice),
      discountPercentage: parseFloat(product.DiscountedPercentage),
      Category: String(product.Category || ''),
      image: product.images?.[0] || '',
      _originalProduct: product,
    }));

    onApply(cardFiltered);
    onClose();
  };
  const clearFilters = (): void => {
    setSelectedFilters({});
    setSearchText('');
  };

  const renderSearchableContent = (options: CategoryOption[]) => (
    <View style={styles.contentContainer}>
      {/* <View style={styles.searchContainer}>
        <Search color={'#0088B1'} size={20} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="#999"
        />
      </View> */}

      <ScrollView
        style={styles.optionsContainer}
        showsVerticalScrollIndicator={false}>
        {options
          .filter(option =>
            option.label.toLowerCase().includes(searchText.toLowerCase()),
          )
          .map((option: CategoryOption) => (
            <TouchableOpacity
              key={option.key}
              style={styles.optionRow}
              onPress={() => toggleFilter(option.key)}>
              <Text style={styles.optionText}>{option.label}</Text>
              <View
                style={[
                  styles.checkbox,
                  selectedFilters[option.key] && styles.checkboxSelected,
                ]}>
                {selectedFilters[option.key] && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );

  const renderContent = () => {
    const currentOptions =
      optionsData[selectedCategory as keyof typeof optionsData];

    if (currentOptions) {
      return renderSearchableContent(currentOptions);
    }

    if (selectedCategory === 'Price Range') {
      return (
        <View style={styles.contentContainer}>
          <View style={styles.priceInputContainer}>
            <TextInput
              style={styles.priceInput}
              placeholder="Min"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
            <Text style={styles.priceSeparator}>-</Text>
            <TextInput
              style={styles.priceInput}
              placeholder="Max"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
          </View>
        </View>
      );
    }

    return (
      <View style={styles.contentContainer}>
        <Text style={styles.contentSubtitle}>
          Content for {selectedCategory} will be displayed here.
        </Text>
      </View>
    );
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.overlayTouch}
          activeOpacity={1}
          onPress={onClose}
        />

        <Animated.View
          style={[styles.bottomSheet, {transform: [{translateY}]}]}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Filters</Text>
          </View>

          <View style={styles.mainContent}>
            <View style={styles.sidebar}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {sidebarItems.map((item: SidebarItem) => (
                  <TouchableOpacity
                    key={item}
                    style={[
                      styles.sidebarItem,
                      selectedCategory === item && styles.sidebarItemActive,
                    ]}
                    onPress={() => setSelectedCategory(item)}>
                    <Text
                      style={[
                        styles.sidebarText,
                        selectedCategory === item && styles.sidebarTextActive,
                      ]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.contentArea}>{renderContent()}</View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
              <Text style={styles.clearButtonText}>Clear Filters</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.applyButton,
                !hasActiveFilters() && styles.applyButtonDisabled,
              ]}
              disabled={!hasActiveFilters()}
              onPress={applyFilters}>
              <Text
                style={[
                  styles.applyButtonText,
                  !hasActiveFilters() && styles.applyButtonTextDisabled,
                ]}>
                Apply Filter
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default FilterBottomSheet;
