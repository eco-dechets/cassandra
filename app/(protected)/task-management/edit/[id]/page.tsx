"use client"
import React, {useEffect, useState} from 'react';
import {z} from "zod";
import {EmployeeSchema, TaskManagementSchema} from "@/src/schemas";
import {createTaskManagement, getTaskManagement, updateTaskManagement} from "@/src/actions/task-management";
import {getEmployees} from "@/src/actions/employee";
import {getVendors} from "@/src/actions/vendor";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {TaskPriority, TaskState, TaskType} from "@prisma/client";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";

function Page({params}: { params: { id: string } }) {

    const [task, setTask] = useState<z.infer<typeof TaskManagementSchema>>()
    const [employees, setEmployees] = useState<any>([])
    const [vendors, setVendors] = useState<any>([])

    const router = useRouter()

    useEffect(() => {
        getEmployees().then((res) => {
            setEmployees(res)
        })

        getVendors().then((res) => {
            setVendors(res)
        })
    }, []);

    useEffect(() => {
        getTaskManagement(params.id).then((res) => {
            setTask(res as any)
        })
    }, [params.id]);


    const form = useForm<z.infer<typeof TaskManagementSchema>>({
        resolver: zodResolver(TaskManagementSchema),
        values: {
            date: task?.date,
            who: task?.who as string,
            dueDate: task?.dueDate as string,
            from: task?.from as string,
            type: task?.type as string,
            description: task?.description as string,
            priority: task?.priority as string,
            assignedTo: task?.assignedTo as string,
            duration: task?.duration as string,
            state: task?.state,
        },
    })

    const onSubmit = (values: z.infer<typeof TaskManagementSchema>) => {
        values.date = dayjs(values.date).format("YYYY-MM-DD")
        values.dueDate = dayjs(values.dueDate).format("YYYY-MM-DD")

        updateTaskManagement(params.id, values).then((res) => {
            if (res.success) {
                toast.success(res.success)
                router.push("/task-management")
            }

            if (res.error) {
                toast.error(res.error)
            }

        })
    }

    return (
        <div className="flex h-full flex-col pt-10">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
                    <div className="flex justify-between items-center p-2 pb-10">
                        <div className={"flex items-center gap-5"}>

                            <span className="text-3xl">Modifier une tache</span>
                        </div>
                        <Button
                            type="submit">Modifier</Button>
                    </div>

                    <Card>
                        <CardContent>
                            <div className="flex gap-3 pt-5">
                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({field}) => (
                                        <FormItem className="flex flex-col w-full">
                                            <FormLabel>Date</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                dayjs(field.value).format("DD/MM/YYYY")
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                            date > new Date() || date < new Date("1900-01-01")
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="dueDate"
                                    render={({field}) => (
                                        <FormItem className="flex flex-col w-full">
                                            <FormLabel>Date d&apos;échéance</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                dayjs(field.value).format("DD/MM/YYYY")
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                            date < new Date("1900-01-01")
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="pt-5 gap-6 flex w-full">
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({field}) => (
                                        <FormItem className={"w-full"}>
                                            <FormLabel>Type</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue
                                                            placeholder="Selectionner un type"/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {Object.values(TaskType)?.map((operatingSite: any) => (
                                                        <SelectItem key={operatingSite}
                                                                    value={operatingSite}>{operatingSite}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="priority"
                                    render={({field}) => (
                                        <FormItem className={"w-full"}>
                                            <FormLabel>Priorité</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue
                                                            placeholder="Selectionner la priorité"/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {Object.values(TaskPriority)?.map((operatingSite: any) => (
                                                        <SelectItem key={operatingSite}
                                                                    value={operatingSite}>{operatingSite}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="state"
                                    render={({field}) => (
                                        <FormItem className={"w-full"}>
                                            <FormLabel>Status</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue
                                                            placeholder="Selectionner la priorité"/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {Object.values(TaskState)?.map((operatingSite: any) => (
                                                        <SelectItem key={operatingSite}
                                                                    value={operatingSite}>{operatingSite}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="pt-5 gap-6 flex w-full">


                                <FormField
                                    control={form.control}
                                    name="from"
                                    render={({field}) => (
                                        <FormItem className={"w-full"}>
                                            <FormLabel>Demandeur</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue
                                                            placeholder="Selectionner un demandeur"/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {employees?.map((operatingSite: z.infer<typeof EmployeeSchema>) => (
                                                        <SelectItem key={operatingSite.id}
                                                                    value={operatingSite.id!.toString()}>{operatingSite.firstName} {operatingSite.lastName}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="who"
                                    render={({field}) => (
                                        <FormItem className={"w-full"}>
                                            <FormLabel>Qui ?</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue
                                                            placeholder="Selectionner un demandeur"/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="prestataire">Prestataire</SelectItem>
                                                    <SelectItem value="utilisateur">Utilisateur</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="pt-5 gap-6 flex w-full">
                                {form.watch("who") === "utilisateur" && (
                                    <FormField
                                        control={form.control}
                                        name="assignedTo"
                                        render={({field}) => (
                                            <FormItem className={"w-full"}>
                                                <FormLabel>Utilisateur</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue
                                                                placeholder="Selectionner un utilsateur"/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {employees?.map((operatingSite: z.infer<typeof EmployeeSchema>) => (
                                                            <SelectItem key={operatingSite.id}
                                                                        value={operatingSite.id!.toString()}>{operatingSite.firstName} {operatingSite.lastName}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                )}

                                {form.watch("who") === "prestataire" && (
                                    <FormField
                                        control={form.control}
                                        name="assignedTo"
                                        render={({field}) => (
                                            <FormItem className={"w-full"}>
                                                <FormLabel>Prestataire</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue
                                                                placeholder="Selectionner un prestataire"/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {vendors?.map((operatingSite: any) => (
                                                            <SelectItem key={operatingSite.id}
                                                                        value={operatingSite.id!.toString()}>{operatingSite.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                )}

                                <FormField
                                    control={form.control}
                                    name={"duration"}
                                    render={({field}) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Durée</FormLabel>
                                            <FormControl>
                                                <Input type={"number"} {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="w-full pt-5">
                                <div className="pb-5">
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Détails</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        className="resize-none"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </CardContent>

                    </Card>

                </form>
            </Form>
        </div>
    );
}

export default Page;