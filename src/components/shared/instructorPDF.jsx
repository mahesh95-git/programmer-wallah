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

const InstructorPDF = ({ instructors }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Instructor List</Text>
      
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCell}>Name</Text>
          <Text style={styles.tableCell}>Email</Text>
          <Text style={styles.tableCell}>Contact</Text>
          <Text style={styles.tableCell}>Created Courses</Text>
          <Text style={styles.tableCell}>Join Date</Text>
        </View>
        
        {instructors.map((instructor) => (
          <View key={instructor._id} style={styles.tableRow}>
            <Text style={styles.tableCell}>
              {`${instructor.firstName} ${instructor.lastName}`.trim()}
            </Text>
            <Text style={styles.tableCell}>{instructor.email}</Text>
            <Text style={styles.tableCell}>{instructor.contactNumber || 'N/A'}</Text>
            <Text style={styles.tableCell}>{instructor.totalCreatedCourses}</Text>
            <Text style={styles.tableCell}>
              {new Date(instructor.createdAt).toLocaleDateString()}
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

export default InstructorPDF;