import React, { useEffect } from 'react'
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@material-ui/core";

const Bookings = (props) => {


  useEffect(() => {

  }, []);
  const bookings = [
    { id: 1, service: "睫毛嫁接", date: "2025-12-20 14:00", status: "已預約" },
    { id: 2, service: "補睫毛", date: "2025-12-25 16:00", status: "已完成" },
  ];

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
          {bookings.map((d, i) => (
            <TableRow key={d.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{d.service}</TableCell>
              <TableCell>{d.date}</TableCell>
              <TableCell>{d.status}</TableCell>
              <TableCell>
                {d.status === "已預約" && <Button variant="outlined" color="secondary">取消</Button>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default Bookings;
