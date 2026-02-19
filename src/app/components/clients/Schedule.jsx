import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Container,
    Typography,
    Button,
    Box,
    Card,
    CardContent,
    Grid,
    Chip,
    Divider
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EventIcon from "@material-ui/icons/Event";
import CategoryIcon from "@material-ui/icons/Category";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100vh",
        background: "#F7F2FB",
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: theme.spacing(4),
    },
    title: {
        fontWeight: 700,
        background: "linear-gradient(135deg, #5998CA 0%, #CD75CE 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
    },
    bookButton: {
        borderRadius: 30,
        padding: theme.spacing(1.5, 4),
        fontWeight: 600,
        background: "linear-gradient(135deg, #5998CA 0%, #7C84A4 50%, #CD75CE 100%)",
        backgroundSize: "200% 200%",
        color: "#fff",
        boxShadow: "0 8px 20px rgba(89, 152, 202, 0.4)",
        transition: "all 0.4s ease",
        "&:hover": {
            backgroundPosition: "100% 0",
            boxShadow: "0 12px 30px rgba(205, 117, 206, 0.5)",
            transform: "translateY(-2px)",
        },
    },
    card: {
        borderRadius: 20,
        padding: theme.spacing(3),
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 8px 25px rgba(89, 152, 202, 0.15)",
        border: "1px solid rgba(255, 255, 255, 0.5)",
        transition: "all 0.3s ease",
        "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 12px 35px rgba(205, 117, 206, 0.25)",
        },
    },
    cardHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: theme.spacing(2),
    },
    indexChip: {
        background: "linear-gradient(135deg, #97BCEE 0%, #CD75CE 100%)",
        color: "#fff",
        fontWeight: 600,
        minWidth: 40,
    },
    infoRow: {
        display: "flex",
        alignItems: "center",
        marginBottom: theme.spacing(1.5),
    },
    icon: {
        color: "#5998CA",
        marginRight: theme.spacing(1.5),
        fontSize: 20,
    },
    label: {
        color: "#7C84A4",
        marginRight: theme.spacing(1),
        fontWeight: 500,
    },
    value: {
        color: "#5998CA",
        fontWeight: 500,
    },
    statusChip: {
        fontWeight: 600,
        borderRadius: 20,
    },
    statusPending: {
        background: "rgba(89, 152, 202, 0.2)",
        color: "#5998CA",
    },
    statusConfirmed: {
        background: "rgba(76, 175, 80, 0.2)",
        color: "#4CAF50",
    },
    statusCancelled: {
        background: "rgba(158, 158, 158, 0.2)",
        color: "#9E9E9E",
    },
    cancelButton: {
        borderRadius: 20,
        borderColor: "#CD75CE",
        color: "#CD75CE",
        "&:hover": {
            borderColor: "#CD75CE",
            background: "rgba(205, 117, 206, 0.1)",
        },
    },
    divider: {
        margin: theme.spacing(2, 0),
        background: "linear-gradient(90deg, transparent, #97BCEE, transparent)",
    },
    emptyState: {
        textAlign: "center",
        padding: theme.spacing(8),
        background: "rgba(255, 255, 255, 0.95)",
        borderRadius: 24,
        boxShadow: "0 8px 25px rgba(89, 152, 202, 0.15)",
    },
    emptyIcon: {
        fontSize: 80,
        color: "#97BCEE",
        marginBottom: theme.spacing(2),
    },
    emptyText: {
        color: "#7C84A4",
        marginBottom: theme.spacing(3),
    },
    filterBar: {
        display: "flex",
        gap: theme.spacing(1),
        marginBottom: theme.spacing(3),
        flexWrap: "wrap",
    },
    filterChip: {
        borderRadius: 20,
        fontWeight: 500,
        cursor: "pointer",
        border: "2px solid #97BCEE",
        color: "#7C84A4",
        background: "transparent",
        "&:hover": {
            background: "rgba(89, 152, 202, 0.1)",
        },
    },
    filterChipActive: {
        borderRadius: 20,
        fontWeight: 600,
        cursor: "pointer",
        border: "2px solid transparent",
        color: "#fff",
        background: "linear-gradient(135deg, #5998CA 0%, #CD75CE 100%)",
    },
}));

const FILTERS = [
    { label: '未完成', value: 0 },
    { label: '已完成', value: 1 },
    { label: '已取消', value: 2 },
    { label: '全部',   value: null },
]

function Schedule(props) {
    const classes = useStyles();
    const [filterStatus, setFilterStatus] = useState(0)
    const {
        fetching, items, error, pfetching,
        getSchedule, cancelSchedule,
        openConfirm
    } = props

    useEffect(() => {
        getSchedule()
    }, []);

    const filteredItems = filterStatus === null
        ? items
        : items.filter(d => d.status === filterStatus)

    const getStatusClass = (status) => {
        switch (status) {
            case 0: return classes.statusPending;
            case 1: return classes.statusConfirmed;
            default: return classes.statusCancelled;
        }
    }

    return (
        <Box className={classes.root}>
            <Container>
                <Box className={classes.header}>
                    <Typography variant="h3" className={classes.title}>
                        我的預約
                    </Typography>
                    <Button
                        variant="contained"
                        component={Link}
                        to='/booking'
                        className={classes.bookButton}
                    >
                        我要預約
                    </Button>
                </Box>

                <Box className={classes.filterBar}>
                    {FILTERS.map(f => (
                        <Chip
                            key={f.label}
                            label={f.label}
                            className={filterStatus === f.value ? classes.filterChipActive : classes.filterChip}
                            onClick={() => setFilterStatus(f.value)}
                        />
                    ))}
                </Box>

                {filteredItems && filteredItems.length > 0 ? (
                    <Grid container spacing={3}>
                        {filteredItems.map((d, i) => (
                            <Grid item xs={12} md={6} key={i}>
                                <Card className={classes.card} elevation={0}>
                                    <Box className={classes.cardHeader}>
                                        <Chip label={`#${i + 1}`} className={classes.indexChip} />
                                        <Chip
                                            label={d.status_fm}
                                            className={`${classes.statusChip} ${getStatusClass(d.status)}`}
                                        />
                                    </Box>

                                    <Divider className={classes.divider} />

                                    <Box className={classes.infoRow}>
                                        <CategoryIcon className={classes.icon} />
                                        <Typography className={classes.label}>服務項目：</Typography>
                                        <Typography className={classes.value}>{d.service}</Typography>
                                    </Box>

                                    <Box className={classes.infoRow}>
                                        <EventIcon className={classes.icon} />
                                        <Typography className={classes.label}>預約時間：</Typography>
                                        <Typography className={classes.value}>{d.date} {d.time}</Typography>
                                    </Box>

                                    {d.status === 0 && (
                                        <>
                                            <Divider className={classes.divider} />
                                            <Box display="flex" justifyContent="flex-end">
                                                <Button
                                                    variant="outlined"
                                                    className={classes.cancelButton}
                                                    onClick={() => openConfirm('確定要取消此筆預約資料嗎?', () => cancelSchedule(d.id))}
                                                >
                                                    取消預約
                                                </Button>
                                            </Box>
                                        </>
                                    )}
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Box className={classes.emptyState}>
                        <EventAvailableIcon className={classes.emptyIcon} />
                        <Typography variant="h5" className={classes.emptyText}>
                            目前沒有預約記錄
                        </Typography>
                        <Button
                            variant="contained"
                            component={Link}
                            to='/booking'
                            className={classes.bookButton}
                        >
                            立即預約
                        </Button>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default Schedule;
