import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import clsx from "clsx";

export default function ImplantSurgerySchedule() {
  const [schedules, setSchedules] = useState([
    { id: 1, date: "2025-03-01", confirmDeadline: "", hospital: "중앙대학교구강악안면외과", patient: "홍길동", surgeryArea: "턱", quantity: 1, status: "요청됨" },
    { id: 2, date: "2025-03-05", confirmDeadline: "", hospital: "중앙대학교구강악안면외과", patient: "김철수", surgeryArea: "잇몸", quantity: 2, status: "설계 중" },
  ]);

  const statusColors = {
    "요청됨": "bg-yellow-100",
    "설계 중": "bg-yellow-200",
    "컨펌 요청": "bg-yellow-300",
    "제작 중": "bg-yellow-400",
    "수술 완료": "bg-white",
    "수술 취소, 연기": "bg-white",
  };

  const holidays = ["2025-03-03", "2025-05-05", "2025-06-06", "2025-08-15", "2025-10-03", "2025-12-25"];

  const getMinSurgeryDate = () => {
    let date = new Date();
    let daysAdded = 0;
    while (daysAdded < 6) {
      date.setDate(date.getDate() + 1);
      if (date.getDay() !== 0 && date.getDay() !== 6 && !holidays.includes(date.toISOString().split("T")[0])) {
        daysAdded++;
      }
    }
    return date.toISOString().split("T")[0];
  };

  const [newSchedule, setNewSchedule] = useState({ date: "", patient: "", surgeryArea: "", quantity: "", status: "요청됨" });

  const addSchedule = () => {
    if (!newSchedule.date || !newSchedule.patient || !newSchedule.surgeryArea || !newSchedule.quantity) return;
    setSchedules([...schedules, { id: schedules.length + 1, hospital: "중앙대학교구강악안면외과", confirmDeadline: "", ...newSchedule }]);
    setNewSchedule({ date: "", patient: "", surgeryArea: "", quantity: "", status: "요청됨" });
  };

  const isFormComplete = newSchedule.date && newSchedule.patient && newSchedule.surgeryArea && newSchedule.quantity;

  const updateStatus = (id, newStatus) => {
    setSchedules(schedules.map(schedule => schedule.id === id ? { ...schedule, status: newStatus } : schedule));
  };

  const updateConfirmDeadline = (id, newDeadline) => {
    setSchedules(schedules.map(schedule => schedule.id === id ? { ...schedule, confirmDeadline: newDeadline } : schedule));
  };

  const deleteSchedule = (id) => {
    setSchedules(schedules.filter(schedule => schedule.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4 tracking-tight">중앙대학교 EASYMADE CF 수술일정 관리</h1>
      
      <Card className="mb-6">
        <CardContent className="p-4 grid grid-cols-5 gap-4">
          <Input type="date" min={getMinSurgeryDate()} value={newSchedule.date} onChange={(e) => setNewSchedule({ ...newSchedule, date: e.target.value })} placeholder="수술 날짜" />
          <Input type="text" value={newSchedule.patient} onChange={(e) => setNewSchedule({ ...newSchedule, patient: e.target.value })} placeholder="환자 이름" />
          <Input type="text" value={newSchedule.surgeryArea} onChange={(e) => setNewSchedule({ ...newSchedule, surgeryArea: e.target.value })} placeholder="수술 부위" />
          <Input type="number" min="1" value={newSchedule.quantity} onChange={(e) => setNewSchedule({ ...newSchedule, quantity: e.target.value })} placeholder="수량" className="placeholder-opacity-50" />
          <Button onClick={addSchedule} disabled={!isFormComplete}>일정 추가</Button>
        </CardContent>
      </Card>
    </div>
  );
}
