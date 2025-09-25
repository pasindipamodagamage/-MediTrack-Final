import { Medicine } from '../types/medicine';
import { collection, addDoc, doc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface saveMedicine {
    title: string;
    qty: number;
    unitPrice: number;
    email?: string;
}

export const saveMedicine = async (medicine: Medicine) => {
    const { title, qty, unitPrice, email } = medicine;
    const medicineData: saveMedicine = { title, qty, unitPrice, email };

    try {
        const docRef = await addDoc(collection(db, "medicine"), medicineData);
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
    }
};

export const getMedicine = async (): Promise<Medicine[]> => {
    try {
        const snapshot = await getDocs(collection(db, "medicine"));
        return snapshot.docs.map((d) => ({
            id: d.id,
            ...d.data(),
        })) as Medicine[];
    } catch (e) {
        console.error("Error fetching medicine: ", e);
        throw e;
    }
};

export const updateMed = async (id: string, updatedData: Partial<Medicine>) => {
    try {
        const docRef = doc(db, "medicine", id);
        const { id: _, ...updateDataWithoutId } = updatedData;
        await updateDoc(docRef, updateDataWithoutId);
        console.log("Medicine updated!");
    } catch (error) {
        console.error("Error updating medicine:", error);
        throw error;
    }
};

export const deleteMed = async (id: string) => {
    try {
        const docRef = doc(db, "medicine", id);
        await deleteDoc(docRef);
        console.log("Medicine deleted!");
    } catch (error) {
        console.error("Error deleting medicine:", error);
        throw error;
    }
};