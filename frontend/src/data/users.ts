export interface User {
  id: number;
  name: string;
  leaveType: string;
  startDate: string;
  returnDate: string;
  status: string;
}

export const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    leaveType: "Sick Leave",
    startDate: "2021-09-01",
    returnDate: "2021-09-03",
    status: "Pending",
  },
  {
    id: 2,
    name: "Jane Smith",
    leaveType: "Annual Leave",
    startDate: "2021-10-15",
    returnDate: "2021-10-22",
    status: "Approved",
  },
  {
    id: 3,
    name: "Alice Johnson",
    leaveType: "Maternity Leave",
    startDate: "2022-01-01",
    returnDate: "2022-04-01",
    status: "Approved",
  },
  {
    id: 4,
    name: "Bob Brown",
    leaveType: "Sick Leave",
    startDate: "2021-11-05",
    returnDate: "2021-11-07",
    status: "Pending",
  },
  {
    id: 5,
    name: "Carol White",
    leaveType: "Unpaid Leave",
    startDate: "2021-12-10",
    returnDate: "2021-12-20",
    status: "Rejected",
  },
  {
    id: 6,
    name: "David Wilson",
    leaveType: "Parental Leave",
    startDate: "2022-05-16",
    returnDate: "2022-06-16",
    status: "Approved",
  },
  {
    id: 7,
    name: "Eve Black",
    leaveType: "Study Leave",
    startDate: "2022-02-01",
    returnDate: "2022-02-10",
    status: "Pending",
  },
  {
    id: 8,
    name: "Frank Clark",
    leaveType: "Annual Leave",
    startDate: "2021-08-23",
    returnDate: "2021-09-02",
    status: "Approved",
  },
  {
    id: 9,
    name: "Grace Lewis",
    leaveType: "Sick Leave",
    startDate: "2021-07-15",
    returnDate: "2021-07-18",
    status: "Rejected",
  },
  {
    id: 10,
    name: "Henry Walker",
    leaveType: "Bereavement Leave",
    startDate: "2022-03-12",
    returnDate: "2022-03-15",
    status: "Approved",
  },
  {
    id: 11,
    name: "Carol White",
    leaveType: "Unpaid Leave",
    startDate: "2021-12-10",
    returnDate: "2021-12-20",
    status: "Rejected",
  },
  {
    id: 12,
    name: "David Wilson",
    leaveType: "Parental Leave",
    startDate: "2022-05-16",
    returnDate: "2022-06-16",
    status: "Approved",
  },
  {
    id: 13,
    name: "Eve Black",
    leaveType: "Study Leave",
    startDate: "2022-02-01",
    returnDate: "2022-02-10",
    status: "Pending",
  },
  {
    id: 14,
    name: "Frank Clark",
    leaveType: "Annual Leave",
    startDate: "2021-08-23",
    returnDate: "2021-09-02",
    status: "Approved",
  },
  {
    id: 16,
    name: "Grace Lewis",
    leaveType: "Sick Leave",
    startDate: "2021-07-15",
    returnDate: "2021-07-18",
    status: "Rejected",
  },
  {
    id: 20,
    name: "Henry Walker",
    leaveType: "Bereavement Leave",
    startDate: "2022-03-12",
    returnDate: "2022-03-15",
    status: "Approved",
  },
];

export const employees = [
  "John Doe",
  "Jane Smith",
  "Alice Johnson",
  "Bob Brown",
  "Carol White",
  "David Wilson",
  "Eve Black",
  "Frank Clark",
  "Grace Lewis",
  "Henry Walker",
];
