"use client";
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

const StudentPDF = ({ students }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Student List</Text>
      
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCell}>Name</Text>
          <Text style={styles.tableCell}>Email</Text>
          <Text style={styles.tableCell}>User ID</Text>
          <Text style={styles.tableCell}>Enrolled Courses</Text>
          <Text style={styles.tableCell}>Join Date</Text>
        </View>
        
        {students.map((student) => (
          <View key={student._id} style={styles.tableRow}>
            <Text style={styles.tableCell}>
              {`${student.firstName} ${student.lastName}`.trim()}
            </Text>
            <Text style={styles.tableCell}>{student.email}</Text>
            <Text style={styles.tableCell}>{student._id}</Text>
            <Text style={styles.tableCell}>
              {student.enrolledCourses?.length || 0}
            </Text>
            <Text style={styles.tableCell}>
              {new Date(parseInt(student._id.substring(0, 8), 16) * 1000).toLocaleDateString()}
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

export default StudentPDF;