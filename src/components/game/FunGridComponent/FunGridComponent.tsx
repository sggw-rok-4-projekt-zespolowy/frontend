import styles from './FunGridComponent.module.css';

export default function FunGridComponent() {
  return (
    <div className="w-full h-full bg-red-500">
        <div className={styles.perspective}>
            <div className={styles.floor}>
                <div className={styles.lineholder}>
                    {[...Array(10)].map((x, i) =>
                        <span key={i} className={styles.linevertical}/>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
}