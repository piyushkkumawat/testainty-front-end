import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { formatedDate, formattedDateTime } from '../../Utils/Index';
import { t } from 'i18next';
import logoImage from '../../logo.png'

const styles = StyleSheet.create({
    page: {
        display: 'flex',
        flexDirection: 'row',
    },
    section: {
        margin: 10,
        padding: 10,
    },
    header: {
        fontSize: '12px',
        width: '100%',
        marginLeft: '10px',
        marginTop: '15px'
    },
    subHeading: {
        fontSize: '12px',
        width: '100%',
        marginTop: '15px',
        marginLeft: '20px',
    },
    label: {
        fontSize: 10,
        fontWeight: '500',
        marginTop: '10px',
        color: 'gray'
    },
    text: {
        fontSize: 10,
        marginTop: '10px'
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        margin: '5px',
        width: '100%'
    },
    table: {
        width: '100%',
        marginTop: '10px'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '10%',
    },
    cell: {
        width: '50%',
        padding: 5,
    },
    image: {
        width: '150px',
        height: '70px',
        marginBottom: 10,

    },
    heading: {
        textAlign: 'center',
        marginTop: '15px'
    },
    rowContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    felxCenter: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
    },
    flexColumn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingVertical: '10px'
    },
    innerFlex: {
        width: '50%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    line: {
        borderBottom: 1,
        borderBottomColor: 'gray',
        marginTop: '5px'
    },
    flexColumnLeft: {
        display: 'flex',
        justifyContent: 'flex-start',
        width: '50%'
    },
    flexColumnRight: {
        display: 'flex',
        justifyContent: 'flex-start',
        width: '50%',
        borderLeft: 1,
        borderColor: 'gray',
    },
    circleContainer: {
        width: '200px',
        height: '200px',
        position: 'relative',
    },
    circleBackground: {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        backgroundColor: 'lightgray', // Background color for the entire circle
    },
    circleProgressBar: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        backgroundColor: 'green', // Color for the progress bar
    },
    percentage: {
        fontSize: 24,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
        color: 'white'
    },
    evaluationFlex: {
        width: '50%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginLeft: '10px'
    },
    skillFlex: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: '30px',
    },
   

});

const PdfDocument = ({ candidateData, testData }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>

                <View style={styles.section}>
                    <View style={styles.rowContainer}>
                        <View style={styles.flexColumn} >
                            {/* <Text >{t('testainty')}</Text>
                            <Text style={styles.label}>
                                Elevate Assessment, Illuminate Potential
                            </Text> */}
                            <Image style={styles.image} src={logoImage} />
                        </View>

                        
                    </View>

                    <View style={styles.felxCenter}>
                        <Text style={styles.heading}>{t('assessmentReport')}</Text>

                    </View>
                    <View style={styles.line}></View>

                    <View ><Text style={styles.header}>{t('candidateDetails')}</Text></View>

                    <View style={styles.flexRow}>
                        <View style={styles.innerFlex}>
                            <View>
                                <Text style={styles.label}>{t('namec')}</Text>
                                <Text style={styles.label}>{t('emailc')} </Text>
                                <Text style={styles.label}>{t('assessmentNamec')} </Text>
                                <Text style={styles.label}>{t('durationc')}</Text>

                            </View>
                            <View>
                                <Text style={styles.text}>{candidateData.candidateName}</Text>
                                <Text style={styles.text}>{candidateData.candidateEmail}</Text>
                                <Text style={styles.text}>{candidateData.AssessmentName}</Text>
                                <Text style={styles.text}>{candidateData.AssessmentDuration} {t('min')}</Text>
                            </View>
                        </View>
                        <View style={styles.innerFlex}>
                            <View >
                                <Text style={styles.label}>{t('appearedOnc')} </Text>
                                <Text style={styles.label}>{t('startedAtc')}</Text>
                                <Text style={styles.label}>{t('completedAtc')} </Text>
                            </View>
                            <View >
                                <Text style={styles.text}>{formatedDate(candidateData.StartedAt)}</Text>
                                <Text style={styles.text}>{formattedDateTime(candidateData.StartedAt)}</Text>
                                <Text style={styles.text}>{formattedDateTime(candidateData.CompletedAt)}</Text>

                            </View>
                        </View>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.flexRow}>
                        <View style={styles.flexColumnLeft}>
                            <Text style={styles.header}>{t('evaluation')}</Text>
                            <View style={styles.evaluationFlex}>
                                <View>
                                    <Text style={styles.label}>{t('totalPercentage')}</Text>
                                </View>
                                <View>
                                    <Text style={styles.text}>{candidateData.Percentage}{t('percente')}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.flexColumnRight}>
                            <Text style={styles.subHeading}>{t('skillReport')}</Text>
                            {testData && testData.labels && testData.labels.length &&
                                <>
                                    {testData.labels.map((label, index) => (
                                        <View style={styles.skillFlex} key={index}>
                                            <View>
                                                <Text style={styles.label}>{label} :</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.text}>{testData.data[index]}{t('percente')}</Text>
                                            </View>
                                        </View>
                                    ))}
                                </>
                            }
                        </View>
                    </View>
                    <View style={styles.line}></View>
                </View>
            </Page>
        </Document >
    );
};

export default PdfDocument;
