import { tConvert } from "@/utlits/Functions";
import { BiFootball, BiPin, BiSolidOffer, BiTrash } from "react-icons/bi";
import { MdEvent } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import React, { useContext, useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Tooltip,
} from "@mui/material";
import { ImInfo } from "react-icons/im";
import { BsArrowDown } from "react-icons/bs";
import { IoCashOutline } from "react-icons/io5";
import { paiedWith } from "@/utlits/Variabels";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { BooksContextProvider } from "@/contexts/BooksContext";
import { IoMdRepeat } from "react-icons/io";
import { CourtsContextProvider } from "@/contexts/CourtsContext";

const Book = ({ book, court, getStaffs, getBooks }: any) => {
  // open edit
  const [editOpen, setEditOpen] = useState(false);

  // contexts
  const userContext = useContext(AuthContextProvider);
  const bookContext = useContext(BooksContextProvider);
  const courtContext = useContext(CourtsContextProvider);

  // fields
  const [name, setName] = useState(book?.book_time?.name);
  const [phone, setPhone] = useState(book?.book_time?.phone);
  const [bookToDate, setBookToDate] = useState(book?.book_to_date);
  const [eventValue, setEventValue] = useState(book?.event);
  const [withBallValue, setWithBallValue] = useState(book?.with_ball);
  const [isPaiedValue, setIsPaiedValue] = useState(book?.is_paied);
  const [paiedWithValue, setPaiedWithValue] = useState(book?.paied);
  const [selectedTools, setSelectedTools] = useState<any>(book?.tools);
  const [isCancelled, setIsCancelled] = useState<any>(book?.is_cancelled);
  const [isCancelledDay, setIsCancelledDay] = useState<any>(book?.is_cancelled_day);
  const [overTime, setOverTime] = useState<any>({})



  // prices
  const [ballPrice, setBallPrice] = useState(
    book?.with_ball && court?.ball_price ? court?.ball_price : 0
  );
  const [eventPrice, setEventPrice] = useState(
    book?.event ? court?.event_price : 0
  );

  // tools
  const tools = court?.additional_court[0]?.tools_court;
  const toolsTotalPrice = 0


  // pinned times
  const pinnedTimes = bookContext?.pinnedTimes
  useEffect(() => {
    if (editOpen) {
      bookContext?.getTime(editOpen)
    }
  }, [editOpen])

  // can delete
  const can_delete = bookContext?.can_delete


  return (
    <div
      className={`bookContainer ${book?.is_cancelled ? 'border border-red-500' : ''} w-full max-w-xs flex flex-col gap-2`}
    >
      <div onClick={() => setEditOpen(book?.id)} className="book from-indigo-50 to-blue-50 bg-gradient-to-tr shadow-md transition-all hover:shadow-lg p-3 w-full h-fit cursor-pointer flex flex-col gap-1">
        <div className="tims flex justify-between">
          <p>
            من: {tConvert(book?.book_from?.slice(0, 5))} حتي:{" "}
            {tConvert(book?.book_to?.slice(0, 5))}
          </p>
          <div className="flex gap-3">
            {book?.book_to_date && (
              <span className="pinned text-blue-800">
                <BiPin />
              </span>
            )}
            {book?.event && (
              <span className="pinned text-yellow-800">
                <MdEvent />
              </span>
            )}
            {book?.with_ball && (
              <span className="pinned text-green-800">
                <BiFootball />
              </span>
            )}
            {Number(book?.book_time?.court_details?.offer_from?.slice(0, 2)) <=
              Number(book?.book_from?.slice(0, 2)) &&
              Number(book?.book_time?.court_details?.offer_to?.slice(0, 2)) >=
              Number(book?.book_to?.slice(0, 2)) && (
                <span className="pinned text-indigo-700">
                  <BiSolidOffer />
                </span>
              )}
          </div>
        </div>
        <div className="infos flex gap-1 flex-col">
          <p>{book?.book_time?.name}</p>
          <p>{book?.book_time?.phone}</p>
        </div>
        <div className="is_paied flex justify-between">
          <p className="my-auto">
            {book?.is_paied ? (
              <span className="text-green-600">تم الدفع</span>
            ) : (
              <span className="text-red-600">لم يدفع</span>
            )}
          </p>
          <p className="my-auto">{book?.paied}</p>
        </div>
        <div className="pinned flex gap-2 justify-between">
          <p>
            {book?.book_to_date ? (
              <span className="text-green-600">تم التثبيت</span>
            ) : (
              <span className="text-red-600">لم يثبت</span>
            )}
          </p>
          <p>
            {book?.book_to_date ? (
              <span>{book?.book_to_date}</span>
            ) : (
              <span className="text-red-600">
                <FcCancel />
              </span>
            )}
          </p>
        </div>
        <div className="total">
          <p><span className="text-2xl">{book?.total_price}</span> EGP</p>
        </div>
        {
          book?.is_cancelled &&
          <div className="total">
            <p>تم اسرتجاع الاموال</p>
          </div>
        }
        <div>
          <small>{book?.book_time?.book_date}</small>
        </div>
      </div>

      {/* edit */}
      <div
        className={`
              fixed w-screen flex flex-col
              justify-center top-0 right-0 
              bg-neutral-700 transition-all duration-300
              ${book?.id == editOpen ? "bg-opacity-30 h-screen p-2 z-40" : "bg-opacity-0 h-0 p-0 -z-50"}              
            `}
      >
        <div
          className={`
                rounded-md shadow-lg from-indigo-50 via-blue-100 to-indigo-50
                bg-gradient-to-tr
                w-full max-w-2xl mx-auto h-full 
                overflow-scroll
                relative flex flex-col
                gap-2 transition-all duration-300
                ${book?.id == editOpen ? "max-h-[calc(100vh-100px)] my-auto p-3 z-50 md:max-h-[calc(100vh-300px)]" : "max-h-[0px] p-0 -z-50 md:max-h-[0px]"}
              `}
        >
          {/* buttons */}
          {
            can_delete &&
            <div className="btns flex gap-5 w-[200px]">
              {
                isCancelled ?
                  <button onClick={() => setIsCancelled(!isCancelled)} className="successBtn">ارجاع الوقت</button>
                  :
                  <button onClick={() => setIsCancelled(!isCancelled)} className="errorBtn">الغاء هذا الوقت</button>
              }
            </div>
          }

          {/* infos */}
          <div className="infos mt-7 flex flex-col gap-2">
            <input
              type="text"
              placeholder="الاسم"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              placeholder="رقم الهاتف"
              defaultValue={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <hr className="my-3 p-[0.5px] bg-indigo-500" />
          <div className="flex flex-col gap-4">
            {/* over time */}
            {
              userContext?.user?.is_staff || userContext?.user?.is_superuser ?
                <Accordion>
                  <AccordionSummary expandIcon={<BsArrowDown />}>
                    ساعات اضافية
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-2">
                        <label className="my-auto">ساعة اضافية</label>
                        <Tooltip
                          title={
                            <p className="font_light">
                              تأكد من عدم وجود ساعات محجوزة في نفس الوقت الذي ستختارة
                            </p>
                          }
                        >
                          <span className="text-blue-500 my-auto">
                            <ImInfo />
                          </span>
                        </Tooltip>
                      </div>
                      {
                        book?.book_time?.book_over_time[0]?.id ? (
                          <div className="flex flex-col gap-2">
                            <div className="delete w-[200px]">
                              <Button onClick={(e) => {
                                e.preventDefault()
                                bookContext?.deleteOverTime(book?.book_time?.book_over_time[0]?.id)
                                courtContext?.getCourtBooks(book.book_time.court)
                              }} color="error" endIcon={<BiTrash />}></Button>
                            </div>
                            <div className="overTime w-full flex flex-col gap-2">
                              <div className="times w-full flex gap-2">
                                <div className="from w-full flex flex-col">
                                  <p>من</p>
                                  <p>{tConvert(book?.book_time?.book_over_time[0].book_from?.slice(0, 5))}</p>
                                </div>
                                <div className="to w-full flex flex-col">
                                  <p>حتي</p>
                                  <p>{tConvert(book?.book_time?.book_over_time[0].book_to?.slice(0, 5))}</p>
                                </div>
                              </div>
                              <div className="notePrice flex-col flex gap-2">
                                <p>{book?.book_time?.book_over_time[0].note}</p>
                                <p>{book?.book_time?.book_over_time[0].price} EGP</p>
                              </div>
                            </div>
                          </div>
                        )
                          : (
                            <div className="overTime w-full flex flex-col gap-2">
                              <div className="times w-full flex gap-2">
                                <div className="from w-full flex flex-col">
                                  <p>من</p>
                                  <input defaultValue={overTime.book_from} onChange={(e: any) => {
                                    overTime.book_from = e?.target?.value
                                  }} type="time" />
                                </div>
                                <div className="to w-full flex flex-col">
                                  <p>حتي</p>
                                  <input defaultValue={overTime.book_to} onChange={(e: any) => {
                                    overTime.book_to = e?.target?.value
                                  }} type="time" />
                                </div>
                              </div>
                              <div className="notePrice flex-col flex gap-2">
                                <input defaultValue={overTime.note} onChange={(e) => overTime.note = e.target.value} type="text" placeholder="ملاحظات" />
                                <input defaultValue={overTime.price} onChange={(e) => overTime.price = e.target.value} type="number" placeholder="السعر" />
                              </div>
                            </div>
                          )
                      }

                    </div>
                  </AccordionDetails>
                </Accordion>
                : null
            }
            {/* boot to date */}
            <Accordion>
              <AccordionSummary expandIcon={<BsArrowDown />}>
                تثبيت الساعة
              </AccordionSummary>
              <AccordionDetails>
                {
                  book?.book_to_date ? (
                    <div className="flex from-neutral-100 to-gray-100 shadow-lg bg-gradient-to-tr p-3 flex-col gap-2">
                      <div className="flex gap-2">
                        <label className="my-auto">الساعة مثبتة حتي</label>
                        <Tooltip
                          title={
                            <p className="font_light">
                              سيتم تثبيت هذا الوقت كل 7 ايام
                            </p>
                          }
                        >
                          <span className="text-blue-500 my-auto">
                            <ImInfo />
                          </span>
                        </Tooltip>
                      </div>
                      {/* pinned times */}
                      <div className="times h-full max-h-[300px] flex flex-col gap-2 p-2 rounded-md overflow-scroll bg-indigo-100">
                        {
                          pinnedTimes?.map((pinnedTime: any) => (
                            <div className="p-2 flex justify-between bg-white rounded-full w-full shadow-md" key={pinnedTime}>
                              <p className="my-auto">{pinnedTime}</p>
                              {
                                isCancelledDay == pinnedTime ?
                                  <Tooltip title={<p className="font_light">ارجاع الوقت</p>}>
                                    <span onClick={() => {
                                      setIsCancelledDay(null)
                                    }} className="bg-green-300 cursor-pointer transition-all hover:bg-green-200 text-green-600  my-auto p-2 rounded-full">
                                      <IoMdRepeat />
                                    </span>
                                  </Tooltip>
                                  :
                                  <Tooltip title={<p className="font_light">الغاء هذا اليوم</p>}>
                                    <span onClick={() => {
                                      pinnedTime == isCancelled ? setIsCancelledDay(null) : setIsCancelledDay(pinnedTime)
                                    }} className="bg-red-300 cursor-pointer transition-all hover:bg-red-200 my-auto p-2 rounded-full">
                                      <FcCancel />
                                    </span>
                                  </Tooltip>
                              }
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  ) : (
                    <div className="flex from-neutral-100 to-gray-100 shadow-lg bg-gradient-to-tr p-3 flex-col gap-2">
                      <div className="flex gap-2">
                        <label className="my-auto">تثبيت الساعة</label>
                        <Tooltip
                          title={
                            <p className="font_light">
                              سيتم تثبيت هذا الوقت كل 7 ايام
                            </p>
                          }
                        >
                          <span className="text-blue-500 my-auto">
                            <ImInfo />
                          </span>
                        </Tooltip>
                      </div>
                      <input
                        defaultValue={bookToDate}
                        onChange={(e: any) => setBookToDate(e.target.value)}
                        type="date"
                      />
                    </div>
                  )
                }
              </AccordionDetails>
            </Accordion>
            {/* event and with ball and is paied */}
            <Accordion>
              <AccordionSummary expandIcon={<BsArrowDown />}>
                <div className="flex w-full justify-between flex-wrap">
                  <p className="my-auto">تفاصيل اخري</p>
                  <div className="flex gap-1 my-auto">
                    {court?.ball_price ? (
                      <div className="ball flex gap-1">
                        <span className="my-auto">
                          <BiFootball />
                        </span>
                        <p className="my-auto">: {ballPrice} EGP</p>
                        {court?.event_price &&
                          Number(book?.book_from?.slice(0, 2)) >=
                          Number(court?.event_from?.slice(0, 2)) &&
                          Number(book?.book_to?.slice(0, 2)) <=
                          Number(court?.event_to?.slice(0, 2)) ? (
                          <p>-</p>
                        ) : null}
                      </div>
                    ) : null}
                    {court?.event_price &&
                      Number(book?.book_from?.slice(0, 2)) >=
                      Number(court?.event_from?.slice(0, 2)) &&
                      Number(book?.book_to?.slice(0, 2)) <=
                      Number(court?.event_to?.slice(0, 2)) ? (
                      <div className="ball flex gap-1">
                        <span className="my-auto">
                          <MdEvent />
                        </span>
                        <p className="my-auto">: {eventPrice} EGP</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className="flex flex-col gap-6">
                  {
                    // book && book inside court event range
                    court?.event_price &&
                      Number(book?.book_from?.slice(0, 2)) >=
                      Number(court?.event_from?.slice(0, 2)) &&
                      Number(book?.book_to?.slice(0, 2)) <=
                      Number(court?.event_to?.slice(0, 2)) ? (
                      <div className="event shadow-lg bg-gradient-to-tr p-3 from-indigo-50 to-gray-100 flex gap-2">
                        <input
                          defaultChecked={eventValue}
                          onChange={(e: any) => setEventValue(!eventValue)}
                          className="w-fit shadow-none"
                          type="checkbox"
                        />
                        <div className="flex gap-1">
                          <span className="my-auto">
                            <MdEvent />
                          </span>
                          <label className="my-auto">هل تحجز لمناسبة ؟</label>
                        </div>
                      </div>
                    ) : null
                  }

                  {court?.ball_price ? (
                    <div className="ball shadow-lg bg-gradient-to-tr p-3 from-indigo-50 to-gray-100 flex gap-2">
                      <input
                        defaultChecked={withBallValue}
                        onChange={(e: any) => setWithBallValue(!withBallValue)}
                        className="w-fit shadow-none"
                        type="checkbox"
                      />
                      <div className="flex gap-1">
                        <span className="my-auto">
                          <BiFootball />
                        </span>
                        <label className="my-auto">
                          هل تريد الحجز بالكرة ؟
                        </label>
                      </div>
                    </div>
                  ) : null}

                  {userContext?.user?.is_staff ||
                    userContext?.user?.is_superuser ? (
                    <div className="is_paied shadow-lg bg-gradient-to-tr p-3 from-indigo-50 to-gray-100 flex gap-2">
                      <input
                        defaultChecked={isPaiedValue}
                        onChange={(e: any) => setIsPaiedValue(!isPaiedValue)}
                        className="w-fit shadow-none"
                        type="checkbox"
                      />
                      <div className="flex gap-1">
                        <span className="my-auto">
                          <IoCashOutline />
                        </span>
                        <label className="my-auto">هل تم الدفع ؟</label>
                      </div>
                    </div>
                  ) : null}

                  <div className="paiedWith flex-col shadow-lg bg-gradient-to-tr p-3 from-indigo-50 to-gray-100 flex gap-2">
                    <div className="flex gap-1">
                      <span className="my-auto">
                        <IoCashOutline />
                      </span>
                      <label className="my-auto">طريقة الدفع</label>
                    </div>
                    <select
                      defaultValue={paiedWithValue}
                      onChange={(e: any) => setPaiedWithValue(e.target.value)}
                    >
                      {paiedWith?.map((p: any) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
            {/* tools */}
            {tools?.length > 0 ? (
              <Accordion>
                <AccordionSummary expandIcon={<BsArrowDown />}>
                  <div className="flex gap-3 w-full flex-wrap justify-between">
                    <p>الادوات المتاحة</p>
                    <p>{toolsTotalPrice} EGP</p>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="flex p-3 flex-col gap-3 h-full max-h-[300px] overflow-scroll">
                    {tools?.map((tool: any, index: any) => (
                      <div
                        key={index}
                        className={`
                            p-3 px-5 cursor-pointer transition-all duration-500 rounded-full flex justify-between
                            ${selectedTools?.find((e: any) => e == tool?.id)
                            ? "bg-green-300 hover:bg-green-200"
                            : "bg-indigo-300 hover:bg-indigo-200"
                          }
                          `}
                        onClick={(e) => {
                          const exist = selectedTools?.find((e: any) => e == tool?.id)
                          if (exist) {
                            setSelectedTools(selectedTools?.filter((e: any) => e !== tool?.id))
                          } else {
                            setSelectedTools((pre: any) => [...pre, tool?.id])
                          }
                        }}
                      >
                        <p className="my-auto">{tool?.title}</p>
                        <p className="my-auto">{tool?.price} EGP</p>
                      </div>
                    ))}
                  </div>
                </AccordionDetails>
              </Accordion>
            ) : null}
          </div>
          <div className="mt-auto">
            <hr className="my-3 p-[0.5px] bg-indigo-500" />
            <div className="flex gap-4 justify-between relative">
              <button id="timeUpdate" onClick={(e: any) => {
                bookContext?.updateBook(
                  e, name, phone, book?.book_time?.id,
                  bookToDate, eventValue, withBallValue, isPaiedValue, paiedWithValue, selectedTools, isCancelled, isCancelledDay,
                  overTime, book?.id
                ).then((e: any) => (e.id && getStaffs && getStaffs() || e.id && getBooks && getBooks()))
              }
              } className="successBtn">حسنا</button>
              <button onClick={() => setEditOpen(false)} className="errorBtn">الغاء</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
