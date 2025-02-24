import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#1a365d',
  },
  table: {
    display: 'table',
    width: '100%',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    borderBottomStyle: 'solid',
    alignItems: 'center',
    minHeight: 35,
  },
  tableHeader: {
    backgroundColor: '#f7fafc',
  },
  tableCell: {
    flex: 1,
    padding: 8,
    fontSize: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 8,
    color: '#718096',
  },
});

const formatPrice = (price, isFree) => {
  if (isFree) return 'Free';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(price);
};

const CoursePDF = ({ courses }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Course List</Text>
      
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCell}>Title</Text>
          <Text style={styles.tableCell}>Instructor</Text>
          <Text style={styles.tableCell}>Rating</Text>
          <Text style={styles.tableCell}>Students</Text>
          <Text style={styles.tableCell}>Price</Text>
          <Text style={styles.tableCell}>Created At</Text>
        </View>
        
        {courses.map((course) => (
          <View key={course._id} style={styles.tableRow}>
            <Text style={styles.tableCell}>{course.title}</Text>
            <Text style={styles.tableCell}>{course.instructor.name}</Text>
            <Text style={styles.tableCell}>
              {`${course.rating.toFixed(1)} (${course.totalReviews} reviews)`}
            </Text>
            <Text style={styles.tableCell}>{course.enrolledStudents}</Text>
            <Text style={styles.tableCell}>
              {formatPrice(course.price, course.isFree)}
            </Text>
            <Text style={styles.tableCell}>
              {new Date(course.createdAt).toLocaleDateString()}
            </Text>
          </View>
        ))}
      </View>
      
      <Text style={styles.footer}>
        Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
      </Text>
    </Page>
  </Document>
);

export default CoursePDF;