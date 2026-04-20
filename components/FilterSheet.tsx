import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Dimensions, Pressable } from 'react-native';
import { X, GraduationCap, Calendar, Home, Hammer, TrendingUp, Clock, Banknote } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';

const { height } = Dimensions.get('window');

interface FilterSheetProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function FilterSheet({ isVisible, onClose }: FilterSheetProps) {
  const [selectedSort, setSelectedSort] = useState('popular');
  const [selectedCampus, setSelectedCampus] = useState('All');

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable 
          style={styles.backdrop} 
          onPress={onClose}
        />
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>Filter & Search</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={20} color={Colors.onSurfaceVariant} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {/* Categories Section */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>CATEGORIES</Text>
              <View style={styles.tagsContainer}>
                <TouchableOpacity style={styles.activeTag}>
                  <GraduationCap size={16} color={Colors.white} fill={Colors.white} />
                  <Text style={styles.activeTagText}>Academics</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tag}>
                  <Calendar size={16} color={Colors.onSurfaceVariant} />
                  <Text style={styles.tagText}>Events</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tag}>
                  <Home size={16} color={Colors.onSurfaceVariant} />
                  <Text style={styles.tagText}>Housing</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tag}>
                  <Hammer size={16} color={Colors.onSurfaceVariant} />
                  <Text style={styles.tagText}>Services</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Sort By Section */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>SORT BY</Text>
              <View style={styles.sortOptions}>
                <TouchableOpacity 
                  style={[styles.sortItem, selectedSort === 'popular' && styles.sortItemActive]}
                  onPress={() => setSelectedSort('popular')}
                >
                  <TrendingUp size={20} color={selectedSort === 'popular' ? Colors.primary : Colors.onSurfaceVariant} />
                  <Text style={[styles.sortText, selectedSort === 'popular' && styles.sortTextActive]}>Most Popular</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.sortItem, selectedSort === 'recent' && styles.sortItemActive]}
                  onPress={() => setSelectedSort('recent')}
                >
                  <Clock size={20} color={selectedSort === 'recent' ? Colors.primary : Colors.onSurfaceVariant} />
                  <Text style={[styles.sortText, selectedSort === 'recent' && styles.sortTextActive]}>Recently Posted</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.sortItem, selectedSort === 'price' && styles.sortItemActive]}
                  onPress={() => setSelectedSort('price')}
                >
                  <Banknote size={20} color={selectedSort === 'price' ? Colors.primary : Colors.onSurfaceVariant} />
                  <Text style={[styles.sortText, selectedSort === 'price' && styles.sortTextActive]}>Lowest Price</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Campus Section */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>CAMPUS</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.campusScroll}>
                {['All', 'FBC', 'IPAM', 'COMAHS', 'Njala', 'EBK'].map(campus => (
                  <TouchableOpacity 
                    key={campus} 
                    style={[styles.campusChip, selectedCampus === campus && styles.campusChipActive]}
                    onPress={() => setSelectedCampus(campus)}
                  >
                    <Text style={[styles.campusChipText, selectedCampus === campus && styles.campusChipTextActive]}>
                      {campus}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </ScrollView>

          {/* Footer Actions */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.clearBtn} onPress={onClose}>
              <Text style={styles.clearText}>Clear All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyBtn} onPress={onClose}>
              <LinearGradient 
                colors={Colors.soulGradient} 
                style={styles.applyGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.applyText}>Apply Filter</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  sheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    maxHeight: height * 0.85,
    width: '100%',
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  title: {
    fontSize: 20,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.onSurface,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionLabel: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    color: Colors.onSurfaceVariant,
    letterSpacing: 1,
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLow,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
  },
  activeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
  },
  tagText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: Colors.onSurfaceVariant,
  },
  activeTagText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: Colors.white,
  },
  sortOptions: {
    gap: 12,
  },
  sortList: {
    gap: 12,
  },
  sortItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: 'rgba(169, 179, 187, 0.2)',
  },
  sortItemActive: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    backgroundColor: Colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  sortIconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  sortText: {
    fontSize: 15,
    fontFamily: 'Inter_500Medium',
    color: Colors.onSurface,
  },
  sortTextActive: {
    color: Colors.primary,
    fontFamily: 'Inter_700Bold',
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  radioOuterEmpty: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(169, 179, 187, 0.4)',
  },
  campusScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  campusChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.surfaceContainerLow,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  campusChipActive: {
    backgroundColor: Colors.primary + '10',
    borderColor: Colors.primary,
  },
  campusChipText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: Colors.onSurfaceVariant,
  },
  campusChipTextActive: {
    color: Colors.primary,
    fontFamily: 'Inter_700Bold',

  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(169, 179, 187, 0.1)',
    gap: 16,
  },
  clearBtn: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearText: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.onSurfaceVariant,
  },
  applyBtn: {
    flex: 2,
    borderRadius: 32,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 4,
  },
  applyGradient: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyText: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.white,
  },
});
