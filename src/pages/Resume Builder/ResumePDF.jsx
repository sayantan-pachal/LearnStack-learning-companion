import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';

// EXACT Tailwind px to PDF pt mapping (1px = 0.75pt)
const styles = StyleSheet.create({
    page: {
        paddingTop: '14mm',
        paddingBottom: '14mm',
        paddingHorizontal: '20mm',
        backgroundColor: '#ffffff',
        fontFamily: 'Helvetica',
    },

    headerSection: {
        borderBottomWidth: 1,
        borderBottomColor: '#9ca3af',
        paddingBottom: 8,
        // ✨ FIX: "Quite big" gap between header and Professional Overview
        marginBottom: 18,
    },

    name: {
        fontSize: 27,
        fontFamily: 'Times-Bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: '#111827',
        marginBottom: 1.5,
    },

    // ✨ FIX: Slightly larger subtitle (8.75pt) while staying on one line
    subtitle: {
        fontSize: 9,
        fontFamily: 'Helvetica-Bold',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        color: '#1f2937',
        marginBottom: 1.5,
    },

    contactRow: {
        fontSize: 9.75,
        color: '#4b5563',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    link: {
        color: '#4b5563',
        textDecoration: 'none',
    },

    sectionBlock: {
        marginBottom: 12,
    },

    sectionTitle: {
        fontSize: 12,
        fontFamily: 'Helvetica-Bold',
        textTransform: 'uppercase',
        color: '#111827',
        marginBottom: 6,
    },

    textJustify: {
        fontSize: 10.7,
        color: '#374151',
        textAlign: 'justify',
        lineHeight: 1.3,
    },

    // ✨ FIX: Slightly larger text specifically for Technical Skills (10.5pt)
    skillsText: {
        fontSize: 10.5,
        color: '#374151',
        textAlign: 'justify',
        lineHeight: 1.3,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },

    // ✨ FIX: Slightly larger font (10.5pt) for Project Names, Degrees, and Certifications
    itemTitle: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 11,
        color: '#1f2937',
    },
    normalText: {
        fontSize: 10,
        color: '#374151',
    },
    grayText: {
        fontSize: 11,
        color: '#4b5563',
    },

    bulletRow: {
        flexDirection: 'row',
        paddingLeft: 30,
        marginTop: 2.5,
    },
    bulletPoint: {
        width: 10.5,
        fontSize: 10.5,
        color: '#374151',
    },
    bulletText: {
        flex: 1,
        fontSize: 10.5, // Keep descriptions smaller than the title
        color: '#374151',
        textAlign: 'justify',
        lineHeight: 1.25,
    },

    spaceY1_5: {
        marginTop: 6,
    },
    projectSpacing: {
        marginTop: 9,
    }
});

export default function ResumePDF({ data }) {
    const { personal, overview, education, skills, projects, certifications } = data;

    return (
        <Document>
            <Page size="A4" style={styles.page}>

                {/* --- HEADER --- */}
                <View style={styles.headerSection}>
                    <Text style={styles.name}>{personal.name || "Your Name"}</Text>
                    <Text style={styles.subtitle}>{personal.subtitle}</Text>
                    <View style={styles.contactRow}>
                        <Text>{personal.location} | </Text>
                        {personal.email ? <Link src={`mailto:${personal.email}`} style={styles.link}>{personal.email} </Link> : null}
                        <Text> | </Text>
                        {personal.githubLinkedin ? <Link src={personal.githubLinkedin} style={styles.link}>GitHub & LinkedIn: {personal.githubLinkedin} </Link> : null}
                        <Text> | </Text>
                        {personal.website ? <Link src={personal.website} style={styles.link}>Website</Link> : null}
                    </View>
                </View>

                {/* --- PROFESSIONAL OVERVIEW --- */}
                <View style={styles.sectionBlock}>
                    <Text style={styles.sectionTitle}>Professional Overview</Text>
                    <Text style={styles.textJustify}>{overview}</Text>
                </View>

                {/* --- EDUCATION --- */}
                <View style={styles.sectionBlock}>
                    <Text style={styles.sectionTitle}>Education</Text>
                    <View>
                        {education.map((edu, index) => (
                            <View key={edu.id || index} style={[styles.row, index > 0 && styles.spaceY1_5]}>
                                <Text style={styles.normalText}>
                                    {/* Applied itemTitle for slightly larger degree text */}
                                    <Text style={styles.itemTitle}>{edu.degree}</Text> | {edu.school}
                                </Text>
                                <Text style={styles.grayText}>{edu.date}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* --- TECHNICAL SKILLS --- */}
                <View style={styles.sectionBlock}>
                    <Text style={styles.sectionTitle}>Technical Skills</Text>
                    {/* Applied skillsText for slightly larger skills description */}
                    <Text style={styles.skillsText}>{skills}</Text>
                </View>

                {/* --- PROJECTS --- */}
                <View style={styles.sectionBlock}>
                    <Text style={styles.sectionTitle}>Projects</Text>
                    <View>
                        {projects.map((proj, index) => (
                            <View key={proj.id || index} style={index > 0 ? styles.projectSpacing : {}}>
                                <View style={[styles.row, { marginBottom: 2.5 }]}>
                                    <Text>
                                        {/* Applied itemTitle for slightly larger project titles */}
                                        {proj.liveLink ? (
                                            <Link src={proj.liveLink} style={[styles.itemTitle, styles.link]}>{proj.title}</Link>
                                        ) : (
                                            <Text style={styles.itemTitle}>{proj.title}</Text>
                                        )}
                                        <Text style={styles.normalText}> | </Text>
                                        {proj.githubLink ? (
                                            <Link src={proj.githubLink} style={[styles.grayText, styles.link]}>{proj.subtitle}</Link>
                                        ) : (
                                            <Text style={styles.grayText}>{proj.subtitle}</Text>
                                        )}
                                    </Text>
                                    <Text style={styles.grayText}>{proj.date}</Text>
                                </View>

                                {proj.bullets && proj.bullets.split('\n').filter(b => b.trim() !== '').map((bullet, idx) => (
                                    <View key={idx} style={styles.bulletRow}>
                                        <Text style={styles.bulletPoint}>•</Text>
                                        <Text style={styles.bulletText}>{bullet}</Text>
                                    </View>
                                ))}
                            </View>
                        ))}
                    </View>
                </View>

                {/* --- PROFESSIONAL DEVELOPMENT --- */}
                <View style={styles.sectionBlock}>
                    <Text style={styles.sectionTitle}>Professional Development</Text>
                    <View>
                        {certifications.map((cert, index) => (
                            <View key={cert.id || index} style={[styles.row, index > 0 && styles.spaceY1_5]}>
                                {/* Applied itemTitle for slightly larger certification names */}
                                <Text style={styles.grayText}>{cert.name}</Text>
                                <Text style={styles.grayText}>{cert.date}</Text>
                            </View>
                        ))}
                    </View>
                </View>

            </Page>
        </Document>
    );
}