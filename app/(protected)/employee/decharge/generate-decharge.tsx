"use client"
import React, {useEffect, useRef, useState} from 'react';
import {getEmployeeById} from "@/src/actions/employee";
import {format} from "@formkit/tempo";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import logo from "@/public/logo_eco.png"
import Image from "next/image";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";

const date = new Date()

function GenerateDecharge({id, name}: { id: string , name: string}) {
    const [employee, setEmployee] = useState<any>()

    useEffect(() => {
        getEmployeeById(id).then((res) => {
            setEmployee(res)
        })
    }, [id]);

    const pdfRef = useRef<any>()

    const downloadPdf = () => {
        const input = pdfRef.current
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const imageWidth = canvas.width
            const imageHeight = canvas.height

            const ratio = Math.min(pdfWidth / imageWidth, pdfHeight / imageHeight)
            const imageX = (pdfWidth - imageWidth * ratio) / 2
            const imageY = 10

            //const imgProps = pdf.getImageProperties(imgData);
            pdf.addImage(imgData, 'PNG', imageX, imageY, imageWidth * ratio, imageHeight * ratio)
            pdf.save(`decharge-${employee?.firstName}-${employee?.lastName}.pdf`);
        });
    }

    return (
        <div className="py-10">

            <div className="px-20 text-xl" ref={pdfRef}>
                <div className="px-10">
                    <div className="grid grid-cols-3 border h-36">
                        <div className="border-r flex justify-center items-center ">
                            <Image src={logo} alt={"logo"} width={300}/>
                        </div>
                        <div className="border-r grid grid-rows-2 ">
                            <div className="border-b flex items-center justify-center uppercase">Formulaire</div>
                            <div className="flex items-center justify-center px-3 uppercase">Décharge remise matériel</div>
                        </div>
                        <div className="grid grid-rows-2">
                            <div className="border-b flex items-center justify-center">SUP-FO026 v01</div>
                            <div className="flex items-center justify-center">Page 1 sur 1</div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end pt-5 px-10">Etablie le {format(date, "short")} </div>
                <div className="text-center pt-20 uppercase">Remise en main propre contre décharge</div>
                <div className="pt-20">
                    <p className="px-10">{employee?.firstName} {employee?.lastName}, certifie avoir restituer le
                        materiel suivant :</p>
                    <div className="pt-10 px-10">
                        <Table className="border text-xl">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px] border-r">Materiel</TableHead>
                                    <TableHead className=" border-r">Réference</TableHead>
                                    <TableHead className="w-[100px] border-r">Unité</TableHead>
                                    <TableHead className="w-[100px] border-r">Acquisition</TableHead>
                                    <TableHead className="w-[100px]">Retour</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    employee?.history.map((h: any) => {
                                        return (
                                            <TableRow key={h.id}>
                                                <TableCell className="border-r">{h.material.category.name}</TableCell>
                                                <TableCell className="border-r">{h.material.serialNumber}</TableCell>
                                                <TableCell className="border-r">1</TableCell>
                                                <TableCell className="border-r"></TableCell>
                                                <TableCell>X</TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </div>
                    <div className="pt-10 px-10">
                        <p>Par la présente attestation contre signée de remise de materiel, vous vous engagez à
                            restituer le
                            matériel en bon état à la fin de votre contrat.</p>
                        <p className="pt-5">En cas de non-restitution du matériel, l&apos;entreprise se réserve le droit
                            d&apos;engager une procédure juridique pour récupérer ses biens.</p>
                <p className="pt-10">De la part de {name}, Service IT {format(date, "short", 'fr')}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 pb-10 pt-20 px-20">
                    <p>Signature</p>
                    <p>Signature</p>
                </div>
            </div>
            <div className="px-32">
                <Separator className="mb-5"/>
                <Button onClick={downloadPdf}>Télécharger la décharge</Button>
            </div>
        </div>
    );
}

export default GenerateDecharge;