import React, { useEffect } from 'react'
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@material-ui/core";
import Loading from '../statics/Loading'

function Schedule(props) {
    const {
        fetching, items, error,
        getSchedule
    } = props

    useEffect(() => {
        getSchedule()
    }, []);


    if (fetching || error) return fetching ? <Loading full /> : error;
    return (
        <Container>
            <Typography variant="h4" gutterBottom className='fw-flex fw-flex-jc-sb'>
                <span>我的預約</span>
                <Button variant="outlined" color="primary" size="large" >我要預約</Button>
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>項次</TableCell>
                        <TableCell>服務項目</TableCell>
                        <TableCell>日期時間</TableCell>
                        <TableCell>狀態</TableCell>
                        <TableCell>操作</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items?.map((d, i) => (
                        <TableRow key={i}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{d.service}</TableCell>
                            <TableCell>{d.date}</TableCell>
                            <TableCell className={d.status === 0 ? 'w3-text-blue' : d.status === 1 ? 'w3-text-green' : 'w3-text-red'}>{d.status_fm}</TableCell>
                            <TableCell>
                                {d.status === 0 && <Button variant="outlined" color="secondary">取消</Button>}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default Schedule;
