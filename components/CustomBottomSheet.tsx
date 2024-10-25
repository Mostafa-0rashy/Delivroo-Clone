import React, { forwardRef, useImperativeHandle, useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BottomSheetModal, BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface CustomBottomSheetProps {
  content: string;
}

const CustomBottomSheet = forwardRef((props: CustomBottomSheetProps, ref) => {
    const snapPoints = useMemo(() => ['50%', '70%'], []); 
    const [delivStyle, setDelivStyle] = useState(styles.activeButton);
    const [pickupStyle, setPickupStyle] = useState(styles.InactiveBtn);

    const handleDeliv = () => {
      setDelivStyle(styles.activeButton);
      setPickupStyle(styles.InactiveBtn);
    };

    const handlePickup = () => {
      setPickupStyle(styles.activeButton);
      setDelivStyle(styles.InactiveBtn);
    };

    // Ref for the BottomSheetModal
    const bottomSheetRef = React.useRef<BottomSheetModal>(null);

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      present: () => {
        bottomSheetRef.current?.present();
      },
      close: () => {
        bottomSheetRef.current?.close(); // Use the ref's close method
      },
    }));

    const handleSheetChanges = useCallback((index: number) => {
      console.log('BottomSheet changed to index:', index);
    }, []);

    const renderBackdrop = useCallback((props: any) => (
     <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1} // Make the backdrop disappear when the modal is fully closed
        appearsOnIndex={0} // Show the backdrop as soon as the modal appears
        opacity={0.7} // Set the opacity to 70%
        pressBehavior="close" // Close the bottom sheet when the backdrop is pressed
      />
    ), []);

    return (
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop} // Use the backdrop here
      >
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.buttonGroup}>
            <TouchableOpacity onPress={handleDeliv} style={[styles.optionButton, delivStyle === styles.activeButton ? styles.activeButton : {}]}>
              <Text style={delivStyle === styles.activeButton ? styles.activeButtonText : styles.inactiveButtonText}>Delivery</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePickup} style={[styles.optionButton, pickupStyle === styles.activeButton ? styles.activeButton : {}]}>
              <Text style={pickupStyle === styles.InactiveBtn ? styles.inactiveButtonText : styles.activeButtonText}>Pick Up</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.subHeader}>Your Location</Text>
          <Link href={'/(modal)/location-search'} asChild>
            <TouchableOpacity>
              <View style={styles.optionRow}>
                <Ionicons name='location-outline' size={30} color={Colors.primary} />
                <Text style={styles.optionText}>Use Current Location</Text>
                <Ionicons name='chevron-forward' size={20} color={Colors.primary} />
              </View>
            </TouchableOpacity>
          </Link>

          <Text style={styles.subHeader}>Arrival Time</Text>
          <TouchableOpacity>
            <View style={styles.optionRow}>
              <Ionicons name='stopwatch-outline' size={30} color={Colors.primary} />
              <Text style={styles.optionText}>Deliver Now</Text>
              <Ionicons name='chevron-forward' size={20} color={Colors.primary} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.confirmButton} onPress={() => bottomSheetRef.current?.close()}>
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheetModal>
    );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  activeButton: {
    backgroundColor: Colors.primary,
  },
  InactiveBtn: {
    paddingHorizontal: 35,
    padding: 8,
    alignItems: 'center',
    margin: 16,
    fontWeight: 'bold',
  },
  activeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inactiveButtonText: {
    color: '#808080',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 15,
    color: '#444',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  optionText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  confirmButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomBottomSheet;
